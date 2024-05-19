import { PromptTemplate } from "@langchain/core/prompts";

// Creates a standalone question from the chat-history and the current question
export const STANDALONE_QUESTION_TEMPLATE = `Dado el siguiente historial de chat y una pregunta de seguimiento, reformula la pregunta de seguimiento para que sea una pregunta independiente sin cambiar su significado original.

Historial de chat: 
{chat_history}

Entrada de seguimiento: {question}

Pregunta independiente:
`;

// Actual question you ask the chat and send the response to client
export const QA_TEMPLATE = `Por favor, lee el siguiente contexto cuidadosamente:

{context}

Ahora, con base en la información proporcionada en el contexto, por favor responde la siguiente pregunta:

Pregunta: {question}

Recuerda:
1. Responde en español.
2. Si no estás seguro de la respuesta, di "No sé" o "No tengo esa información".
3. Tu respuesta debe estar basada únicamente en el contexto proporcionado.
4. Mantén un tono cortés y profesional.

¡Gracias!

Respuesta:
`;

export const condenseQuestionPrompt = PromptTemplate.fromTemplate(
	STANDALONE_QUESTION_TEMPLATE
);

export const answerPrompt = PromptTemplate.fromTemplate(QA_TEMPLATE);
