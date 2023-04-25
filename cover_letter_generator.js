import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate,
} from "langchain/prompts";

openai_api_key = "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";
coverLetter = "";
resume = "";
jobDescription = "";
additionalNotes = "";

const prompt = ChatPromptTemplate.fromPromptMessages([
	SystemMessagePromptTemplate.fromTemplate(
		"Here is a past cover letter I have written: '{coverLetter}' \n\
    Here is my resume: '{resume}' \n\
    Please write a cover letter based on my resume and the following job description: '{jobDescription}' \n\
    Please imitate the style of my past cover letter. '{additionalNotes}'"
	),
	HumanMessagePromptTemplate.fromTemplate("{text}"),
]);

const chain = new LLMChain({
	prompt: prompt,
	llm: chat,
});

const response = await chain.call({
	input_language: "English",
	output_language: "French",
	text: "I love programming.",
});

console.log(response);
