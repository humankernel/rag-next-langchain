import {
	PGVectorStore,
	type PGVectorStoreArgs,
} from "@langchain/community/vectorstores/pgvector";
import { mistralEmbeddings } from "@/lib/langchain/llm";
import { env } from "@/lib/env";
import { sql } from "@/server/db";

const config: PGVectorStoreArgs = {
	postgresConnectionOptions: {
		host: env.PG_HOST,
		port: env.PG_PORT,
		user: env.PG_USER,
		password: env.PG_PASS,
		database: env.PG_DATABASE,
	},
	tableName: "embeddings",
	columns: {
		idColumnName: "id",
		vectorColumnName: "vector",
		contentColumnName: "content",
		metadataColumnName: "metadata",
	},
};

export const pgVectorStore = await PGVectorStore.initialize(
	mistralEmbeddings,
	config
);

export async function addDocuments({
	vectorStore,
	docs,
}: {
	vectorStore: PGVectorStore;
	// @ts-ignore docs type error
	docs: Document<Record<string, any>>[];
}): Promise<void> {
	/* Amount existing elements */
	const itemsMetadata = await sql`select metadata from embeddings`;
	console.log(`🗒️ current docs: ${itemsMetadata.length}`);

	/* Group elements that does not exists */
	const newDocs = docs.filter((doc) => !itemsMetadata.includes(doc.metadata));

	if (newDocs.length > 0) {
		console.log(`👉 Adding new docs: ${newDocs.length} of ${docs.length}`);

		try {
			await vectorStore.addDocuments(newDocs);
			console.log("👍 Correctly added docs to db");
		} catch (err) {
			console.error(
				"🚫 Error: while attempting to store docs in db",
				err
			);
		}
	} else {
		console.log("✅ NO new docs to add");
	}
}
