import sqlite3
import uuid
from pathlib import Path

DB_PATH = Path("chat_memory.db")


def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        role TEXT,
        content TEXT
    )
    """)

    conn.commit()
    conn.close()


def create_session():
    session_id = str(uuid.uuid4())

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute("INSERT INTO sessions (id) VALUES (?)", (session_id,))
    conn.commit()
    conn.close()

    return session_id


def add_message(session_id, role, content):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute(
        "INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)",
        (session_id, role, content),
    )

    conn.commit()
    conn.close()


def get_history(session_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute(
        "SELECT role, content FROM messages WHERE session_id=? ORDER BY id",
        (session_id,),
    )

    rows = c.fetchall()
    conn.close()

    return [{"role": r, "content": c} for r, c in rows]


# initialize database on import
init_db()
