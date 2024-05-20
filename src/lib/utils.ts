import { Message } from "ai";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Document } from "@langchain/core/documents";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
	if (containerRef.current) {
		const lastMessage = containerRef.current.lastElementChild;
		if (lastMessage) {
			const scrollOptions: ScrollIntoViewOptions = {
				behavior: "smooth",
				block: "end",
			};
			lastMessage.scrollIntoView(scrollOptions);
		}
	}
}

export const formatMessage = (message: Message) => {
	return `${message.role === "user" ? "Human" : "Assistant"}: ${
		message.content
	}`;
};

export const formatMessages = (chatHistory: Message[]) => {
	const formattedDialogueTurns = chatHistory.map(formatMessage);
	return formattedDialogueTurns.join("\n");
};

// Reference:
// github.com/hwchase17/langchainjs/blob/357d6fccfc78f1332b54d2302d92e12f0861c12c/examples/src/guides/expression_language/cookbook_conversational_retrieval.ts#L61
export const formatChatHistory = (chatHistory: [string, string][]) => {
	const formattedDialogueTurns = chatHistory.map(
		(dialogueTurn) =>
			`Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`
	);

	return formattedDialogueTurns.join("\n");
};

export function formattedText(inputText: string) {
	return inputText
		.replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
		.replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
		.replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

// Default UI Message
export const initialMessages: Message[] = [
	{
		id: "0",
		role: "system",
		content: `Eres un asistente de IA que responde preguntas basándose únicamente en información del contexto. Aquí están tus reglas:
		1. Siempre responde en español.
		2. Si no estás seguro de la respuesta o la información no está disponible en el contexto, o la pregunta no tienen sentido, di "No sé" o "No tengo esa información".
		3. Mantén un tono cortés y profesional en todas las respuestas.
		4. No inventes información ni salgas del contexto proporcionado.
		
		Empecemos.
		`,
	},
	{
		id: "1",
		role: "assistant",
		content:
			"Hola! Soy tu asistente de IA. Estoy feliz de ayudarte a responder tus preguntas.",
	},
];

export const combineDocumentsFn = (docs: Document[]) => {
	const serializedDocs = docs.map((doc) => doc.pageContent);
	return serializedDocs.join("\n\n");
};

interface Data {
	sources: string[];
}

// Maps the sources with the right ai-message
export const getSources = (data: Data[], role: string, index: number) => {
	if (role === "assistant" && index >= 2 && (index - 2) % 2 === 0) {
		const sourcesIndex = (index - 2) / 2;
		if (data[sourcesIndex] && data[sourcesIndex].sources) {
			return data[sourcesIndex].sources;
		}
	}
	return [];
};
