import { NextRequest, NextResponse } from "next/server";
import { callChain } from "@/lib/langchain";
import { Message, StreamingTextResponse } from "ai";
import { pgVectorStore } from "@/lib/langchain/vector-stores/pg-vector";
import { formatMessages } from "@/lib/langchain/utils";
import { model } from "@/lib/langchain/llm";

/**
 * This handler initializes and calls a retrieval chain. It composes the chain using
 * LangChain Expression Language. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#conversational-retrieval-chain
 */
export async function POST(req: NextRequest) {
	const body = await req.json();
	const messages: Message[] = body.messages ?? [];
	const previousMessages = messages.slice(0, -1);
	const formattedPreviousMessages = formatMessages(previousMessages);
	const question = messages[messages.length - 1].content;

	// console.log("Chat history ", formattedPreviousMessages.join("\n"));

	if (!question) {
		return NextResponse.json("Error: No question in the request", {
			status: 400,
		});
	}

	try {
		const { stream, serializedSources } = await callChain({
			question,
			chatHistory: formattedPreviousMessages,
			vectorStore: pgVectorStore,
			model,
		});

		return new StreamingTextResponse(stream, {
			headers: {
				"x-message-index": (previousMessages.length + 1).toString(),
				"x-sources": serializedSources,
			},
		});
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status ?? 500 }
		);
	}
}
