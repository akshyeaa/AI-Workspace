from langchain_core.prompts import PromptTemplate

SUMMARY_PROMPT = PromptTemplate.from_template("""
You are an expert research summarizer.

Write a clear, structured summary of the content below.

Content:
{context}

Summary:
""")
