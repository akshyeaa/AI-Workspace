# from fastapi import APIRouter, UploadFile, File, Form
# from typing import Optional

# from .pipeline import run_summary_pipeline
# from .loaders import load_pdf, load_url, load_youtube
# from core.llm_factory import get_llm

# router = APIRouter()


# @router.post("/summarize")
# async def summarize(

#     provider: str = Form(...),
#     apiKey: str = Form(...),
#     model: str = Form(...),

#     url: Optional[str] = Form(None),

#     file: Optional[UploadFile] = File(None),

# ):

#     # ---- Create LLM ----

#     llm = get_llm(
#         provider=provider,
#         api_key=apiKey,
#         model=model,
#     )

#     # ---- Load documents ----

#     if file:

#         data = await file.read()
#         docs = load_pdf(data)

#     elif url:

#         if "youtube" in url:
#             docs = load_youtube(url)
#         else:
#             docs = load_url(url)

#     else:
#         return {"error": "Provide PDF or URL"}

#     # ---- Summarize ----

#     summary = run_summary_pipeline(llm, docs)

#     return {"summary": summary}

from fastapi import APIRouter, UploadFile, File, Form
from .pipeline import run_summary_pipeline
from .loaders import load_pdf, load_url, load_youtube
from core.llm_factory import get_llm

router = APIRouter()


@router.post("/summarize")
async def summarize(
    provider: str = Form(...),
    apiKey: str = Form(...),
    model: str = Form(...),
    url: str | None = Form(None),
    file: UploadFile | None = File(None),
):

    llm = get_llm(provider, apiKey, model)

    if file:

        data = await file.read()
        docs = load_pdf(data)

    elif url:

        if "youtube" in url:
            docs = load_youtube(url)
        else:
            docs = load_url(url)

    else:
        return {"error": "Provide PDF or URL"}

    summary = run_summary_pipeline(llm, docs)

    return {"summary": summary}
