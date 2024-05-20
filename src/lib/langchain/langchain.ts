import { RunnableSequence } from "@langchain/core/runnables";
import {
	BytesOutputParser,
	StringOutputParser,
} from "@langchain/core/output_parsers";
import { answerPrompt, condenseQuestionPrompt } from "./prompt";
import { Document } from "@langchain/core/documents";
import { VectorStore } from "@langchain/core/vectorstores";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { combineDocumentsFn } from "../utils";

type callChainArgs = {
	question: string;
	chatHistory: string;
	model: ChatOllama;
	vectorStore: VectorStore;
};

export async function callChain({
	question,
	chatHistory,
	vectorStore,
	model,
}: callChainArgs) {
	const sanitizedQuestion = question.trim().replaceAll("\n", " ");

	/**
	 * We use LangChain Expression Language to compose two chains.
	 * To learn more, see the guide here:
	 *
	 * https://js.langchain.com/docs/guides/expression_language/cookbook
	 *
	 * You can also use the "createRetrievalChain" method with a
	 * "historyAwareRetriever" to get something prebaked.
	 */
	const standaloneQuestionChain = RunnableSequence.from([
		condenseQuestionPrompt,
		model,
		new StringOutputParser(),
	]);

	let resolveWithDocuments: (value: Document[]) => void;
	const documentPromise = new Promise<Document[]>((resolve) => {
		resolveWithDocuments = resolve;
	});

	const retriever = vectorStore.asRetriever({
		callbacks: [
			{
				handleRetrieverEnd(documents) {
					resolveWithDocuments(documents);
				},
			},
		],
	});

	const retrievalChain = retriever.pipe(combineDocumentsFn);

	const answerChain = RunnableSequence.from([
		{
			context: RunnableSequence.from([
				(input) => input.question,
				retrievalChain,
			]),
			chat_history: (input) => input.chat_history,
			question: (input) => input.question,
		},
		answerPrompt,
		model,
	]);

	const conversationalRetrievalQAChain = RunnableSequence.from([
		{
			question: standaloneQuestionChain,
			chat_history: (input) => input.chat_history,
		},
		answerChain,
		new BytesOutputParser(),
	]);

	const stream = await conversationalRetrievalQAChain.stream({
		question: sanitizedQuestion,
		chat_history: chatHistory,
	});

	const documents = await documentPromise;
	const serializedSources = Buffer.from(
		JSON.stringify(
			documents.map((doc) => {
				return {
					pageContent: doc.pageContent.slice(0, 50) + "...",
					metadata: doc.metadata,
				};
			})
		)
	).toString("base64");

	return { stream, serializedSources };
}
