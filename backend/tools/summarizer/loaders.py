import requests
from bs4 import BeautifulSoup
from langchain_core.documents import Document


# -----------------------
# PDF — keep unchanged
# -----------------------

def load_pdf(data):
    from langchain_community.document_loaders import PyPDFLoader
    import tempfile

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as f:
        f.write(data)
        path = f.name

    loader = PyPDFLoader(path)
    return loader.load()


# -----------------------
# YouTube — keep unchanged
# -----------------------

def load_youtube(url):

    from langchain_community.document_loaders import YoutubeLoader

    loader = YoutubeLoader.from_youtube_url(
        url,
        add_video_info=False,
        language=["en"],
    )

    docs = loader.load()

    # safety trim
    docs[0].page_content = docs[0].page_content[:6000]

    return docs


# -----------------------
# 🚀 FAST URL loader
# -----------------------

def load_url(url):

    try:

        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=8   # 🔥 prevents hanging
        )

        soup = BeautifulSoup(response.text, "html.parser")

        # remove junk
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()

        text = soup.get_text(separator="\n")

        # 🔥 HARD LIMIT — speed + safety
        text = text.strip()[:6000]

        return [Document(page_content=text)]

    except Exception as e:

        print("URL load failed:", e)

        return [Document(page_content="Could not load webpage content.")]
