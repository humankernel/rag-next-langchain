// Creates a standalone question from the chat-history and the current question
export const STANDALONE_QUESTION_TEMPLATE = 
`Dado el siguiente historial de chat y una pregunta de seguimiento, reformula la pregunta de seguimiento para que sea una pregunta independiente.

Historial de chat: 
{chat_history} 

Entrada de seguimiento: {question} 

Pregunta independiente:
`;

// Actual question you ask the chat and send the response to client
export const QA_TEMPLATE = 
`Por favor, lee el siguiente contexto cuidadosamente:

{context}

Ahora, con base en la información proporcionada en el contexto, por favor responde la siguiente pregunta:

Pregunta: {question}.

Recuerda, tu respuesta debe estar basada únicamente en el contexto proporcionado. ¡Gracias!
`
