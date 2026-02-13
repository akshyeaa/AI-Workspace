# backend/core/llm_factory.py

# from langchain_groq import ChatGroq


# def get_llm(provider: str, api_key: str, model: str):
#     """
#     Factory to return correct LLM client.
#     """

#     if provider == "groq":
#         return ChatGroq(
#             groq_api_key=api_key,
#             model_name=model,
#             temperature=0.3
#         )

#     raise ValueError("Unsupported provider")

from langchain_groq import ChatGroq
from langchain_huggingface import ChatHuggingFace


def get_llm(provider: str, api_key: str, model: str):

    if provider == "groq":

        return ChatGroq(
            groq_api_key=api_key,
            model=model,          # modern param
            temperature=0.7
        )

    elif provider == "hf":

        return ChatHuggingFace(
            huggingface_api_key=api_key,
            model=model,
        )

    raise ValueError("Unsupported provider")
