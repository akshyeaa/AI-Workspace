# import subprocess
# import os
# import tempfile


# def compile_latex(latex_code: str):
#     with tempfile.TemporaryDirectory() as tmpdir:

#         tex_path = os.path.join(tmpdir, "paper.tex")

#         with open(tex_path, "w", encoding="utf-8") as f:
#             f.write(latex_code)

#         subprocess.run(
#             ["pdflatex", "-interaction=nonstopmode", "paper.tex"],
#             cwd=tmpdir,
#             stdout=subprocess.PIPE,
#             stderr=subprocess.PIPE,
#         )

#         pdf_path = os.path.join(tmpdir, "paper.pdf")

#         with open(pdf_path, "rb") as f:
#             pdf_bytes = f.read()

#     return pdf_bytes


# backend/utils/latex_compiler.py

import subprocess
import tempfile
import os
import shutil


def compile_latex(tex_string: str, diagram_paths=None):

    # If pdflatex is not installed, skip PDF generation.
    if shutil.which("pdflatex") is None:
        return None

    with tempfile.TemporaryDirectory() as tmpdir:

        tex_file = os.path.join(tmpdir, "paper.tex")

        with open(tex_file, "w", encoding="utf-8") as f:
            f.write(tex_string)

        # ✅ Copy ALL diagrams into LaTeX temp folder
        if diagram_paths:

            for path in diagram_paths:

                if os.path.exists(path):

                    filename = os.path.basename(path)

                    shutil.copy(
                        path,
                        os.path.join(tmpdir, filename)
                    )

        # Compile PDF
        subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "paper.tex"],
            cwd=tmpdir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        pdf_file = os.path.join(tmpdir, "paper.pdf")

        if not os.path.exists(pdf_file):
            raise RuntimeError("PDF compilation failed")

        with open(pdf_file, "rb") as f:
            return f.read()
