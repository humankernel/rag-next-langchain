import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

interface Document {
	pageContent: string;
	metadata: Record<string, any>;
}

/* see docs for supporting more file's
 * https://js.langchain.com/docs/integrations/document_loaders/file_loaders/
 */
export async function loadDocuments(path: string) {
	try {
		const loader = new DirectoryLoader(
			path,
			{
				".txt": (path) => new TextLoader(path),
				".pdf": (path) => new PDFLoader(path),
				".docx": (path) => new DocxLoader(path),
			},
			true
		);
		return loader.load();
	} catch (e) {
		console.error(e);
		throw new Error("PDF docs chunking failed !");
	}
}

export async function splitDocuments(docs: Document[]) {
	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000,
		chunkOverlap: 200,
	});

	return textSplitter.splitDocuments(docs);
}
