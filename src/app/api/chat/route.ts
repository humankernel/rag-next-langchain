import { NextRequest, NextResponse } from "next/server";
import { callChain } from "@/lib/langchain/langchain";
import { Message } from "ai";
import { formatMessage } from "@/lib/utils";
import { pgVectorStore } from "@/lib/langchain/vector-stores/pg-vector";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const messages: Message[] = body.messages ?? [];
	// console.log("Messages ", messages);
	const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
	const question = messages[messages.length - 1].content;

	// console.log("Chat history ", formattedPreviousMessages.join("\n"));

	if (!question) {
		return NextResponse.json("Error: No question in the request", {
			status: 400,
		});
	}

	try {
		const streamingTextResponse = callChain({
			question,
			chatHistory: formattedPreviousMessages.join("\n"),
			vectorStore: pgVectorStore
		});

		return streamingTextResponse;
	} catch (error) {
		console.error("Internal server error ", error);
		return NextResponse.json("Error: Something went wrong. Try again!", {
			status: 500,
		});
	}
}
