# from sqlalchemy import create_engine
# from urllib.parse import quote_plus

# def create_database_connection(config: dict):

#     db_type = config.get("db_type")

#     # -------------------------
#     # SQLite demo DB
#     # -------------------------

#     if db_type == "sqlite":

#         db_path = config.get("sqlite_path", "sqlite:///demo.db")

#         return create_engine(db_path)

#     # -------------------------
#     # MySQL external DB
#     # -------------------------

#     elif db_type == "mysql":

#         host = config["host"]
#         user = config["user"]
#         password = config["password"]
#         database = config["database"]
#         password = quote_plus(password)
#         mysql_url = (
#             f"mysql+pymysql://{user}:{password}@{host}/{database}"
#         )

#         return create_engine(mysql_url)

#     else:

#         raise ValueError("Unsupported database type")

from sqlalchemy import create_engine
from urllib.parse import quote_plus


def create_database_connection(config: dict):

    # -------------------------
    # Safe extraction
    # -------------------------

    db_type = (
        config.get("db_type")
        or config.get("type")
        or "sqlite"
    )

    db_type = db_type.lower().strip()

    print("DB CONFIG RECEIVED:", config)
    print("DB TYPE:", db_type)

    # =========================
    # SQLite (default fallback)
    # =========================

    if db_type in ["sqlite", "sqlite3", ""]:

        db_path = config.get(
            "sqlite_path",
            "sqlite:///demo.db"
        )

        print("Using SQLite:", db_path)

        return create_engine(db_path)

    # =========================
    # MySQL
    # =========================

    if db_type in ["mysql", "mariadb"]:

        host = config.get("host")
        user = config.get("user")
        password = config.get("password")
        database = config.get("database")

        if not all([host, user, password, database]):

            raise ValueError(
                "MySQL config incomplete — host/user/password/database required"
            )

        encoded_password = quote_plus(password)

        mysql_url = (
            f"mysql+pymysql://"
            f"{user}:{encoded_password}"
            f"@{host}/{database}"
        )

        print("Connecting MySQL:", mysql_url)

        return create_engine(mysql_url)

    # =========================
    # Unknown DB type
    # =========================

    raise ValueError(
        f"Unsupported database type → '{db_type}'"
    )

