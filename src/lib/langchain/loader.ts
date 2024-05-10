import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/* see docs for supporting more file's
 * https://js.langchain.com/docs/integrations/document_loaders/file_loaders/
 */
export async function loadDocuments(path: string) {
	try {
		const loader = new DirectoryLoader(
			path,
			{
				".txt": (path) => new TextLoader(path),
				".pdf": (path) =>
					new PDFLoader(path, { parsedItemSeparator: "" }),
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

export async function splitDocuments(docs: any) {
	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000,
		chunkOverlap: 200,
	});

	return textSplitter.splitDocuments(docs);
}
