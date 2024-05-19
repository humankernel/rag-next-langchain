import { expect, test } from "vitest";
import { loadEvaluator } from "langchain/evaluation";
import { embeddings, model } from "../llm";


const evaluator = await loadEvaluator("criteria", {
	criteria: "conciseness",
	llm: model,
	embedding: embeddings,
});

test.each([
	{
		name: "suma 2 + 2 es igual a 3",
		input: "Cuanto es 2+2?",
		prediction: `Cuanto es 2+2? Esta es una pregunta basica.
	         La respuesta que estas buscando es que dos mas dos es tres`,
	},
	{
		name: "",
		input: "¿Qué se espera lograr a través del proceso base de Gestión de Procesos de la Organización (GPO)?",
		prediction: `
         a) Definir los procesos de la organización que permitan conducir a la organización al cumplimiento de su misión y objetivos estratégicos.
         b) Establecer una infraestructura tecnológica.
         c) Elaborar una propuesta estándar de los procesos de la organización.
         `,
	},
])("$name", async ({ input, prediction }) => {
	const res = await evaluator.evaluateStrings({ input, prediction });
	if (res.score !== 1) console.log(res.reasoning);
	expect(res.score).toBe(0);
});
