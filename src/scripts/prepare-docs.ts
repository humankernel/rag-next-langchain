import { loadDocuments, splitDocuments } from "@/lib/langchain/loader";
import { addDocuments, pgVectorStore } from "@/lib/langchain/vector-stores/pg-vector";
import { sql } from "@/db";

const DATA_PATH = "docs";
const FLAG = process.argv[2] ?? "";

async function main() {
	if (FLAG === "--clear") {
		console.log("🧹 Cleaning DB");
		await sql.query("delete from embeddings")
        return;
	}

	const docs = await loadDocuments(DATA_PATH);
	const chunks = await splitDocuments(docs);
	await addDocuments({ vectorStore: pgVectorStore, docs: chunks });

	console.log("🏁 Finished");
}

main().then(() => process.exit());
