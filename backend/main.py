# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from tools.research_writer.api import router as research_router
from tools.chatbot.api import router as chatbot_router
from tools.summarizer.api import router as summarizer_router
from tools.sql_agent.api import router as sql_router

app = FastAPI()

# ✅ CORS middleware — allows frontend to talk to backend

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-workspace-sigma.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routes

app.include_router(research_router)
app.include_router(chatbot_router)
app.include_router(summarizer_router)
app.include_router(sql_router)

@app.get("/")
def root():
    return {"status": "AI Workspace backend running"}



