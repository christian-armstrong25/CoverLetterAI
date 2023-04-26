import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
} from "langchain/prompts";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("pdf-merger-form");
	const outputText = document.getElementById("output-text");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		// Get the PDF and text input values
		const coverLetter = document.getElementById("pdf1").files[0];
		const resume = document.getElementById("pdf2").files[0];
		const jobDescription = document.getElementById("text1").value;
		const additionalNotes = document.getElementById("text2").value;

		const prompt = ChatPromptTemplate.fromPromptMessages([
			HumanMessagePromptTemplate.fromTemplate(
				"Here is a past cover letter I have written: '{coverLetter}' \n\
            Here is my resume: '{resume}' \n\
            Please write a cover letter based on my resume and the following job description: '{jobDescription}' \n\
            Please imitate the style of my past cover letter. '{additionalNotes}'"
			),
		]);

		const chat = new ChatOpenAI({
			openAIApiKey: "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",
		});

		const chain = new LLMChain({
			prompt: prompt,
			llm: chat,
		});

		const response = await chain.call({
			coverLetter: coverLetter,
			resume: resume,
			jobDescription: jobDescription,
			additionalNotes: additionalNotes,
		});

		// Set the output div text
		outputText.textContent = response.text;
		console.log(response);
	});
});
