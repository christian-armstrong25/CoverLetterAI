from langchain import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import PyPDFLoader
from langchain.llms import OpenAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage

openai_api_key = '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'

loader = PyPDFLoader("Summer2023Resume.pdf")
resume = loader.load()

loader = PyPDFLoader("CoverLetter.pdf")
cover_letter = loader.load()

job_description = """Qualifications
Eligibility Criteria: Minimum qualifications: Pursuing an Associate's degree program or post secondary or training experience with a focus on subjects in software development or other technical related field
Experience in Software Development and coding in a general purpose programming language
Experience with data structures or algorithms gathered from inside or outside of school or work
Experience programming in three or more of C, C++, C#, Java, JavaScript, Go, Python or similar
Experience with web application development, Unix/Linux environments, mobile application development, distributed and parallel systems, machine learning, information retrieval, natural language processing, networking, developing large software systems, or security software development
Ability to speak and write in English fluently and idiomatically
Responsibilities
Job Description: Responsibilities: Create and support a productive and innovative team
This includes working with peers, managers, and teams
Develop scripts to automate routine tasks
Analyze information and evaluate results to choose the best solution to effectively solve problems
Job description
Job Description: Responsibilities: Create and support a productive and innovative team. This includes working with peers, managers, and teams. Develop scripts to automate routine tasks. Analyze information and evaluate results to choose the best solution to effectively solve problems. Apply knowledge gained in computer science courses to real world problems. Eligibility Criteria: Minimum qualifications: Pursuing an Associate's degree program or post secondary or training experience with a focus on subjects in software development or other technical related field. Experience in Software Development and coding in a general purpose programming language. Experience coding in two or more of C, C++, Java, JavaScript, Python, or similar. Skills Required: Preferred qualifications: Available to work full time for a minimum of 12 weeks outside of university term time and returning to a degree program after completion of the internship. Experience with data structures or algorithms gathered from inside or outside of school or work. Experience programming in three or more of C, C++, C#, Java, JavaScript, Go, Python or similar. Experience with web application development, Unix/Linux environments, mobile application development, distributed and parallel systems, machine learning, information retrieval, natural language processing, networking, developing large software systems, or security software development. Ability to speak and write in English fluently and idiomatically. Google Careers - Google jobs los angeles"""
additional_notes = """"""

template = """
Here is a past cover letter I have written: {cover_letter}
Here is my resume: {resume}
Please write a cover letter based on my resume and the following job description: {job_description}
Please imitate the style of my past cover letter.
{additional_notes}
"""

prompt = PromptTemplate(
    input_variables=["resume", "cover_letter",
                     "job_description", "additional_notes"],
    template=template,
)

final_prompt = prompt.format(resume=resume, cover_letter=cover_letter,
                             job_description=job_description, additional_notes=additional_notes)


chat = ChatOpenAI(temperature=.7, openai_api_key=openai_api_key)
msg = chat(
    [
        HumanMessage(content=final_prompt)
    ]
)

print(f"Final Prompt: {final_prompt}")
print("-----------")
print(f"LLM Output:\n\n {msg.content}")
