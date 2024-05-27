import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { env } from "../../env";

export const model = new ChatOllama({
	baseUrl: env.OLLAMA_URL,
	model: env.OLLAMA_MODEL,
	temperature: 0,
});

export const embeddings = new OllamaEmbeddings({
	baseUrl: env.OLLAMA_URL,
	model: env.OLLAMA_MODEL,
	requestOptions: {
		temperature: 0,
		topK: 30,
	},
});
