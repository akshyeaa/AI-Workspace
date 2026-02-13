# from sqlalchemy import create_engine, text
# import re


# class DatabaseManager:

#     def __init__(self, db_url: str):
#         self.engine = create_engine(db_url)

#     # -------------------------
#     # Clean LLM SQL output
#     # -------------------------

#     def clean_sql(self, query: str) -> str:

#         query = re.sub(r"```sql", "", query, flags=re.IGNORECASE)
#         query = re.sub(r"```", "", query)

#         return query.strip()

#     # -------------------------
#     # Execute SQL
#     # -------------------------

#     def execute(self, query: str):

#         cleaned = self.clean_sql(query)

#         print("\nExecuting SQL:\n", cleaned)

#         with self.engine.begin() as conn:

#             result = conn.execute(text(cleaned))

#             try:
#                 rows = result.fetchall()
#                 return [dict(row._mapping) for row in rows]

#             except:
#                 return {"status": "success"}


from sqlalchemy import text
import re


class DatabaseManager:

    def __init__(self, engine):
        self.engine = engine

    # -----------------------------------
    # Clean LLM SQL
    # -----------------------------------

    def clean_sql(self, query):

        query = re.sub(r"```sql", "", query, flags=re.IGNORECASE)
        query = re.sub(r"```", "", query)

        return query.strip()

    # -----------------------------------
    # Validate SQL safety
    # -----------------------------------

    def validate_sql(self, query):

        forbidden = ["ALTER", "DROP", "TRUNCATE"]

        for word in forbidden:
            if word in query.upper():
                raise Exception(
                    f"Unsafe SQL detected: {word} is not allowed"
                )

        # block multiple statements
        if ";" in query[:-1]:
            raise Exception("Multiple SQL statements not allowed")

    # -----------------------------------
    # Execute SQL
    # -----------------------------------

    def execute(self, query):

        cleaned = self.clean_sql(query)

        self.validate_sql(cleaned)

        print("\nExecuting SQL:\n", cleaned)

        with self.engine.begin() as conn:

            result = conn.execute(text(cleaned))

            try:
                rows = result.fetchall()
                return [dict(row._mapping) for row in rows]

            except:
                return {"status": "success"}

