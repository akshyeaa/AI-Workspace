# from fastapi import APIRouter
# from .schema import SQLRequest
# from .agent import generate_sql
# from .db_manager import DatabaseManager
# from .safety import validate_query

# router = APIRouter()


# @router.post("/sql/chat")
# def sql_chat(request: SQLRequest):

#     sql_query = generate_sql(
#         request.provider,
#         request.apiKey,
#         request.model,
#         request.message
#     )

#     validate_query(sql_query)

#     db = DatabaseManager(request.database_url)

#     result = db.execute(sql_query)

#     return {
#         "generated_sql": sql_query,
#         "result": result
#     }


from fastapi import APIRouter
from .schema import SQLChatRequest
from .db_factory import create_database_connection
from .db_manager import DatabaseManager
from .agent import generate_sql
from core.llm_factory import get_llm

router = APIRouter()


@router.post("/sql/chat")
def sql_chat(request: SQLChatRequest):

    # -------------------------
    # Create LLM
    # -------------------------

    llm = get_llm(
        provider=request.provider,
        api_key=request.apiKey,
        model=request.model,
    )

    # -------------------------
    # Database connection
    # -------------------------

    engine = create_database_connection(
        request.database.dict()
    )

    db = DatabaseManager(engine)

    # -------------------------
    # Generate schema-aware SQL
    # -------------------------

    sql_query = generate_sql(
        llm,
        engine,
        request.message
    )

    # -------------------------
    # Execute SQL
    # -------------------------

    result = db.execute(sql_query)

    return {

        "sql_generated": sql_query,
        "result": result

    }
