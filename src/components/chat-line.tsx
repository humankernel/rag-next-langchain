import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Message } from "ai/react";
import { formattedText } from "@/lib/utils";

const convertNewLines = (text: string) =>
	text.split("\n").map((line, i) => (
		<span key={i}>
			{line}
			<br />
		</span>
	));

interface ChatLineProps extends Partial<Message> {
	sources: string[];
}

export function ChatLine({
	role = "assistant",
	content,
	sources,
}: ChatLineProps) {
	if (!content) {
		return null;
	}
	const formattedMessage = convertNewLines(content);

	return (
		<div>
			<Card className="mb-2">
				<CardHeader>
					<CardTitle
						className={
							role != "assistant"
								? "text-lime-500 dark:text-lime-200"
								: "text-purple-500 dark:text-purple-200"
						}
					>
						{role == "assistant" ? "IA" : "Tu"}
					</CardTitle>
				</CardHeader>
				<CardContent className="text-sm">
					{formattedMessage}
				</CardContent>
				<CardFooter>
					<CardDescription className="w-full">
						{sources && sources.length ? (
							<Accordion
								type="single"
								collapsible
								className="w-full"
							>
								{sources.map((source, index) => (
									<AccordionItem
										value={`source-${index}`}
										key={index}
									>
										<AccordionTrigger>
											{`Fuente ${index + 1}`}
										</AccordionTrigger>
										<AccordionContent>
											{formattedText(source)}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						) : (
							<></>
						)}
					</CardDescription>
				</CardFooter>
			</Card>
		</div>
	);
}
