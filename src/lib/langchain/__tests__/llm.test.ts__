import { callChain } from ".."
import { model } from "../llm"
import { evalPrompt } from "../prompt"
import { pgVectorStore } from "../vector-stores/pg-vector"
import { expect, test } from 'vitest'

test("adds 2 + 2 to equal 4", async () => {
    expect(await queryAndValidate({
        question: "Cuanto es 2+2?",
        expected: "4"
    })).toBe(true)
})

async function queryAndValidate({ question, expected }: { question: string, expected: string }): Promise<boolean> {
    const { stream } = await callChain({
        question,
        chatHistory: "",
        model,
        vectorStore: pgVectorStore
    })

    let actual = ""
    for await (const chunk of stream) {
        const decoded = new TextDecoder().decode(chunk)
        actual += decoded
    }

    console.log({ actual })

    const prompt = await evalPrompt.format({ expected_response: expected, actual_response: actual })
    const evaluationResultsStr = await model.invoke(prompt)
    const evaluationResultsStrCleaned = evaluationResultsStr.content.toString().trim().toLocaleLowerCase()

    console.log({ prompt, evaluationResultsStrCleaned })

    if (evaluationResultsStrCleaned.includes("true")) return true
    else if (evaluationResultsStrCleaned.includes("false")) return false
    else throw new Error("Invalid evaluation result. Cannot determine if 'true' or 'false'")
}

