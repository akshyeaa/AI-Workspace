# from langchain_groq import ChatGroq
# from langchain_core.prompts import ChatPromptTemplate

# SYSTEM_PROMPT = """
# You are a SQL expert.

# Convert user request into valid SQL.

# Rules:
# - Only output SQL
# - No explanations
# """

# prompt = ChatPromptTemplate.from_messages([
#     ("system", SYSTEM_PROMPT),
#     ("user", "{input}")
# ])


# def generate_sql(provider, api_key, model, message):

#     llm = ChatGroq(
#         groq_api_key=api_key,
#         model_name=model,
#         temperature=0
#     )

#     chain = prompt | llm

#     response = chain.invoke({"input": message})

#     return response.content.strip()


from sqlalchemy import inspect


# -----------------------------------
# Schema extraction
# -----------------------------------

def build_schema_prompt(engine):

    inspector = inspect(engine)

    schema_text = ""

    for table in inspector.get_table_names():

        schema_text += f"\nTable: {table}\n"

        for col in inspector.get_columns(table):
            schema_text += f" - {col['name']} ({col['type']})\n"

    return schema_text


# -----------------------------------
# SQL generation with HARD RULES
# -----------------------------------

def generate_sql(llm, engine, user_message):

    schema_info = build_schema_prompt(engine)

    prompt = f"""
You are a SAFE SQL assistant.

DATABASE SCHEMA:
{schema_info}

USER REQUEST:
{user_message}

STRICT RULES:

- Generate EXACTLY ONE SQL statement
- NEVER modify table schema
- NEVER use ALTER/DROP/TRUNCATE
- Only use INSERT/SELECT/UPDATE/DELETE
- Only use columns explicitly mentioned
- Missing columns should be omitted
- Do NOT invent values
- No markdown
- No explanation
- If id not given by user, Auto Increment ID and add to Database

SQL:
"""

    response = llm.invoke(prompt)

    sql = response.content.strip()

    return sql
