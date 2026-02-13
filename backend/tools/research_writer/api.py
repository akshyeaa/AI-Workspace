# backend/tools/research_writer/api.py

from fastapi import APIRouter
from core.llm_factory import get_llm
from .schema import ResearchRequest
from .pipeline import run_research_pipeline
from fastapi.responses import JSONResponse
from utils.latex_compiler import compile_latex
import base64


router = APIRouter()

@router.post("/research")
def generate_research_paper(request: ResearchRequest):

    llm = get_llm(
        provider=request.provider,
        api_key=request.apiKey,
        model=request.model,
    )

    latex_doc, diagram_paths = run_research_pipeline(
        llm,
        request.topic,
        authors=request.authors
    )


    pdf_bytes = compile_latex(
        latex_doc,
        diagram_paths
    )

    pdf_base64 = base64.b64encode(pdf_bytes).decode()

    return JSONResponse({
        "latex": latex_doc,
        "pdf": pdf_base64
    })


