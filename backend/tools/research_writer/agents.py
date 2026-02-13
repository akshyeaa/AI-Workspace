# backend/tools/research_writer/agent.py

def generate_section(llm, topic: str, section_name: str):

    prompt = f"""
You are an IEEE research paper writer.

Write a professional {section_name} section for a research paper titled:

"{topic}"

Academic tone.
No fluff.
Structured paragraphs.
"""

    response = llm.invoke(prompt)

    return response.content if hasattr(response, "content") else str(response)


def generate_paper_sections(llm, topic: str):

    sections = {}

    sections["title"] = topic
    sections["abstract"] = generate_section(llm, topic, "abstract")
    sections["introduction"] = generate_section(llm, topic, "introduction")
    sections["related_work"] = generate_section(llm, topic, "related work")
    sections["implementation"] = generate_section(llm, topic, "implementation")
    sections["results"] = generate_section(llm, topic, "results and discussion")
    sections["conclusion"] = generate_section(llm, topic, "conclusion")

    return sections
