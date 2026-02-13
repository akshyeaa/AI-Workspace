from langchain_text_splitters import RecursiveCharacterTextSplitter

def run_summary_pipeline(llm, docs):

    # combine documents
    full_text = "\n".join([d.page_content for d in docs])

    # 🚀 HARD LIMIT (most important)
    full_text = full_text[:6000]

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1500,
        chunk_overlap=200
    )

    chunks = splitter.split_text(full_text)

    # summarize each chunk
    partial_summaries = []

    for chunk in chunks:

        prompt = f"""
Summarize this content clearly and concisely:

{chunk}
"""

        summary = llm.invoke(prompt)
        partial_summaries.append(summary.content)

    # final merge summary
    final_prompt = f"""
Combine these summaries into one clean summary:

{" ".join(partial_summaries)}
"""

    final_summary = llm.invoke(final_prompt)

    return final_summary.content
