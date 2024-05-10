import { expect, test } from "vitest";
import { loadEvaluator } from "langchain/evaluation";
import { ChatOllama } from "@langchain/community/chat_models/ollama";

export const model = new ChatOllama({
	baseUrl: "http://127.0.0.1:11434",
	model: "mistral",
	temperature: 0,
});

const evaluator = await loadEvaluator("criteria", {
	criteria: "conciseness",
	llm: model,
});

test("suma 2 + 2 es igual a 3", async () => {
	const res = await evaluator.evaluateStrings({
		input: "Cuanto es 2+2?",
		prediction:
			"Cuanto es 2+2? Esta es una pregunta basica. La respuesta que estas buscando es que dos mas dos es cuatro",
	});

	console.log({ res });

	expect(res.score).toBe(1);
});
