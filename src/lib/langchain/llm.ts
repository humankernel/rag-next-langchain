import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { env } from "@/lib/env";

export const streamingModel = new ChatOllama({
	baseUrl: env.OLLAMA_URL,
	model: env.OLLAMA_MODEL,
	temperature: 0,
	// verbose: true,
});

export const nonStreamingModel = new ChatOllama({
	baseUrl: env.OLLAMA_URL,
	model: env.OLLAMA_MODEL,
	temperature: 0,
	// verbose: true,
});

export const mistralEmbeddings = new OllamaEmbeddings({
	baseUrl: env.OLLAMA_URL,
	model: env.OLLAMA_MODEL,
	requestOptions: {
		temperature: 0,
		topK: 30,
	},
});
