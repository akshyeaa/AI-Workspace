from .agents import generate_paper_sections
from .latex_builder import build_latex
from .diagram_engine import generate_diagram


def run_research_pipeline(llm, topic, authors=None):

    # -----------------------------
    # Generate paper sections
    # -----------------------------
    sections = generate_paper_sections(llm, topic)

    # -----------------------------
    # Diagram placement strategy
    # Each section gets its own unique diagram
    # -----------------------------
    diagrams = {}
    diagram_paths = []

    target_sections = [
        "implementation",
        "results"
    ]

    for section in target_sections:

        # Generate diagram using pure section name
        # This ensures diagram engine produces different visuals
        path = generate_diagram(topic, section)

        if path:
            diagrams[section] = [path]  # latex builder expects list
            diagram_paths.append(path)
        else:
            diagrams[section] = []

    # -----------------------------
    # Build LaTeX
    # -----------------------------
    latex = build_latex(sections, diagrams, authors)

    return latex, diagram_paths
