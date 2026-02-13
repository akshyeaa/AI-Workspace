import re


def clean_latex(text: str) -> str:
    if not text:
        return ""

    # Remove markdown headers
    text = re.sub(r"#+\s*", "", text)

    # Remove duplicated section titles
    text = re.sub(
        r"^(Introduction|Related Work|Implementation|Results|Conclusion|AI Research Writer)\n",
        "",
        text,
        flags=re.IGNORECASE
    )

    # Escape LaTeX breakers
    text = text.replace("&", "\\&")
    text = text.replace("%", "\\%")
    text = text.replace("$", "\\$")
    text = text.replace("#", "\\#")
    text = text.replace("_", "\\_")

    return text.strip()

def extract_references(text):

    refs = []

    lines = text.split("\n")

    for line in lines:

        if "[" in line and "]" in line:
            refs.append(line)

    return refs


# |**Abstract**|**Introduction**|**Related Work**|**Results**|**Discussion**|**Comparison with Existing Systems**|**Limitations and Future Work**

# import re


# def clean_latex(text: str) -> str:
#     """
#     Clean markdown artifacts and LaTeX-breaking characters.
#     Also removes duplicated headings like:
#     **Introduction**
#     """

#     if not text:
#         return ""

#     # remove markdown bold headings like **Title**
#     text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)

#     # remove duplicate headings at beginning of section
#     lines = text.splitlines()

#     if len(lines) > 1:
#         first = lines[0].strip().lower()
#         second = lines[1].strip().lower()

#         if first == second:
#             lines = lines[1:]

#     text = "\n".join(lines)

#     # escape latex special chars
#     replacements = {
#         "&": r"\&",
#         "%": r"\%",
#         "$": r"\$",
#         "#": r"\#",
#         "_": r"\_",
#         "{": r"\{",
#         "}": r"\}",
#     }

#     for k, v in replacements.items():
#         text = text.replace(k, v)

#     return text


# def extract_references(text: str):
#     """
#     Extract reference list if LLM generated numbered refs.
#     """

#     refs = []

#     matches = re.findall(r"\[(\d+)\]\s*(.+)", text)

#     for _, ref in matches:
#         refs.append(ref.strip())

#     return refs
