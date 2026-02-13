from utils.formatting import clean_latex, extract_references
import os


# -----------------------------
# Multi figure generator
# -----------------------------

def multi_figures(paths, caption):

    if not paths:
        return ""

    blocks = ""

    for p in paths:

        filename = os.path.basename(p)

        blocks += f"""
\\begin{{figure}}[htbp]
\\centerline{{\\includegraphics[width=0.9\\columnwidth]{{{filename}}}}}
\\caption{{{caption}}}
\\end{{figure}}
"""

    return blocks


# -----------------------------
# IEEE Author Block
# -----------------------------

def author_block(authors):

    if not authors:
        return "\\author{AI Research Writer}"

    blocks = []

    for i, a in enumerate(authors, 1):

        # convert Pydantic → dict safely
        if hasattr(a, "model_dump"):
            a = a.model_dump()

        name = clean_latex(a.get("name", ""))
        designation = clean_latex(a.get("designation", ""))
        org = clean_latex(a.get("organization", ""))
        loc = clean_latex(a.get("location", ""))
        email = clean_latex(a.get("email", ""))

        blocks.append(f"""
\\IEEEauthorblockN{{{i}. {name}}}
\\IEEEauthorblockA{{{designation} \\\\
{org} \\\\
{loc} \\\\
{email}}}
""")

    return "\\author{" + "\\and".join(blocks) + "}"

# -----------------------------
# Main LaTeX builder
# -----------------------------

def build_latex(sections, diagrams, authors=None):

    title = clean_latex(sections.get("title", "Research Paper"))
    abstract = clean_latex(sections.get("abstract", ""))
    intro = clean_latex(sections.get("introduction", ""))
    related = clean_latex(sections.get("related_work", ""))
    implementation = clean_latex(sections.get("implementation", ""))
    results = clean_latex(sections.get("results", ""))
    conclusion = clean_latex(sections.get("conclusion", ""))

    impl_figs = multi_figures(
        diagrams.get("implementation", []),
        "System Architecture"
    )

    result_figs = multi_figures(
        diagrams.get("results", []),
        "Experimental Workflow"
    )

    # Reference extraction
    refs = extract_references(related)

    bib_items = ""

    for i, r in enumerate(refs, 1):
        bib_items += f"\\bibitem{{b{i}}} {clean_latex(r)}\n"

    template = f"""
\\documentclass[conference]{{IEEEtran}}

\\usepackage{{cite}}
\\usepackage{{amsmath,amssymb,amsfonts}}
\\usepackage{{graphicx}}
\\usepackage{{xcolor}}

\\begin{{document}}

\\title{{{title}}}
{author_block(authors)}

\\maketitle

\\begin{{abstract}}
{abstract}
\\end{{abstract}}

\\section{{Introduction}}
{intro}

\\section{{Related Work}}
{related}

\\section{{Implementation}}
{implementation}
{impl_figs}

\\section{{Results and Discussion}}
{results}
{result_figs}

\\section{{Conclusion}}
{conclusion}

\\begin{{thebibliography}}{{00}}
{bib_items}
\\end{{thebibliography}}

\\end{{document}}
"""

    return template
