# # diagram_engine.py

# from graphviz import Digraph
# import os


# def generate_diagram(topic: str, section: str, out_dir="generated_diagrams"):

#     os.makedirs(out_dir, exist_ok=True)

#     filename = f"{section.replace(' ', '_')}.png"
#     path = os.path.join(out_dir, filename)

#     dot = Digraph(format="png")

#     # Simple intelligent diagram logic
#     dot.node("A", "User Input")
#     dot.node("B", f"{topic}")
#     dot.node("C", "Processing Engine")
#     dot.node("D", "Output")

#     dot.edges([("A", "B"), ("B", "C"), ("C", "D")])

#     dot.render(path.replace(".png", ""), cleanup=True)

#     return path


from graphviz import Digraph
import os


def generate_diagram(topic: str, section: str, out_dir="generated_diagrams"):

    os.makedirs(out_dir, exist_ok=True)

    # Clean filename
    safe_section = section.replace(" ", "_").lower()
    filename = f"{safe_section}.png"
    path = os.path.join(out_dir, filename)

    dot = Digraph(format="png")

    # -------------------------
    # SECTION-AWARE DIAGRAMS
    # -------------------------

    if "implementation" in safe_section:

        dot.attr(label="System Implementation Architecture", labelloc="t")

        dot.node("A", "User / Input Layer")
        dot.node("B", "Application Logic")
        dot.node("C", "Processing Engine")
        dot.node("D", "Storage / Blockchain")
        dot.node("E", "Output Interface")

        dot.edges([
            ("A", "B"),
            ("B", "C"),
            ("C", "D"),
            ("D", "E")
        ])

    elif "results" in safe_section:

        dot.attr(label="Experimental Evaluation Workflow", labelloc="t")

        dot.node("A", "Dataset / Inputs")
        dot.node("B", "Model Execution")
        dot.node("C", "Performance Metrics")
        dot.node("D", "Analysis")
        dot.node("E", "Results Visualization")

        dot.edges([
            ("A", "B"),
            ("B", "C"),
            ("C", "D"),
            ("D", "E")
        ])

    else:

        # fallback generic flow
        dot.attr(label=f"{section.title()} Flow", labelloc="t")

        dot.node("A", "Input")
        dot.node("B", topic[:30])
        dot.node("C", "Processing")
        dot.node("D", "Output")

        dot.edges([
            ("A", "B"),
            ("B", "C"),
            ("C", "D")
        ])

    # Render unique file
    dot.render(path.replace(".png", ""), cleanup=True)

    return path
