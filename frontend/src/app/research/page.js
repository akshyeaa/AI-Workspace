// "use client";

// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function ResearchPage() {

//   const [provider, setProvider] = useState("groq");
//   const [apiKey, setApiKey] = useState("");
//   const [model, setModel] = useState("");
//   const [topic, setTopic] = useState("");

//   const [latex, setLatex] = useState("");
//   const [pdf, setPdf] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Models

//   const groqModels = [
//     "llama-3.3-70b-versatile",
//     "mixtral-8x7b"
//   ];

//   const hfModels = [
//     "mistralai/Mistral-7B-Instruct-v0.3",
//     "meta-llama/Llama-3-8B-Instruct"
//   ];

//   // Generate paper

//   const generateResearch = async () => {

//     if (!topic || !model || !apiKey) {
//       alert("Fill all fields first!");
//       return;
//     }

//     setLoading(true);
//     setLatex("");
//     setPdf(null);

//     try {

//       const res = await fetch("http://localhost:8000/research", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           provider,
//           apiKey,
//           model,
//           topic
//         }),
//       });

//       const data = await res.json();

//       setLatex(data.latex);
//       setPdf(data.pdf);

//     } catch (err) {
//       alert("Backend error — check server");
//     }

//     setLoading(false);
//   };

//   // Download TEX

//   const downloadLatex = () => {

//     if (!latex) return;

//     const blob = new Blob([latex], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "research_paper.tex";
//     a.click();

//     URL.revokeObjectURL(url);
//   };

//   // Download PDF

//   const downloadPDF = () => {

//     if (!pdf) return;

//     const bytes = Uint8Array.from(atob(pdf), c => c.charCodeAt(0));
//     const blob = new Blob([bytes], { type: "application/pdf" });

//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "research_paper.pdf";
//     a.click();

//     URL.revokeObjectURL(url);
//   };

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen px-6 py-30 max-w-4xl mx-auto">

//         <h1 className="text-4xl font-bold mb-8 text-center font-[font6]">
//           AI Research Writer
//         </h1>

//         {/* Provider */}

//         <select
//           value={provider}
//           onChange={e => {
//             setProvider(e.target.value);
//             setModel("");
//           }}
//           className="mb-4 w-full p-3.5 bg-black text-white rounded-full font-[font10] tracking-widest font-bold text-base"
//         >
//           <option value="groq">Groq</option>
//           <option value="hf">Hugging-Face</option>
//         </select>

//         {/* API key */}

//         <input
//           placeholder={`Enter ${provider.toUpperCase()} API key`}
//           value={apiKey}
//           onChange={e => setApiKey(e.target.value)}
//           className="mb-4 w-full p-3 bg-black text-white rounded-full font-mono tracking-widest"
//         />

//         {/* Model */}

//         <select
//           value={model}
//           onChange={e => setModel(e.target.value)}
//           className="mb-4 w-full p-3.5 bg-black text-white rounded-full font-[font9]"
//         >
//           <option value="">Select model</option>

//           {(provider === "groq" ? groqModels : hfModels)
//             .map(m => (
//               <option key={m} value={m}>{m}</option>
//             ))}
//         </select>

//         {/* Topic */}

//         <textarea
//           placeholder="Enter research topic..."
//           value={topic}
//           onChange={e => setTopic(e.target.value)}
//           className="w-full bg-black text-white p-4 h-28 mb-4 rounded-3xl"
//         />

//         {/* Generate */}

//         <button
//           onClick={generateResearch}
//           className="
//             text-lg px-6 py-1
//           text-black rounded-md
//             bg-gradient-to-br from-pink-500 to-orange-400
//             font-[font10]
//             pt-3
//             hover:font-bold
//             active:border-2 active:border-black
//           "
//         >
//           {loading ? "Generating..." : "Generate Paper"}
//         </button>

//         {/* Output */}

//         {latex && (

//           <div className="mt-10 space-y-4">

//             <div className="flex gap-4">

//               <button
//                 onClick={downloadLatex}
//                 className="text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-black dark:focus:ring-cyan-800 font-medium text-sm px-4 py-2.5 text-center leading-5 rounded-full font-[font10] pt-3.5"
//               >
//                 Download TEX
//               </button>

//               <button
//                 onClick={downloadPDF}
//                 className="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-black dark:focus:ring-green-800 font-medium  text-sm px-4 py-2.5 text-center leading-5 rounded-full font-[font10] pt-3.5"
//               >
//                 Download PDF
//               </button>

//               <a
//                 href="https://www.overleaf.com/project"
//                 target="_blank"
//                 className="text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-black dark:focus:ring-teal-800 font-medium text-sm px-4 py-2.5 text-center leading-5 rounded-full font-[font10] pt-3.5 "
//               >
//                 Open Overleaf
//               </a>

//             </div>

//             <textarea
//               value={latex}
//               readOnly
//               className="
//                 w-full h-[600px]
//                 bg-neutral-900
//                 text-green-400
//                 p-6 rounded-xl
//                 font-mono text-sm
//               "
//             />

//           </div>

//         )}

//       </main>

//       <Footer />
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResearchPage() {

  const [provider, setProvider] = useState("groq");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [topic, setTopic] = useState("");

  const [latex, setLatex] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  // AUTHORS STATE
  const [authors, setAuthors] = useState([
    { name: "", designation: "", organization: "", location: "", email: "" }
  ]);

  // Models
  const groqModels = [
    "llama-3.3-70b-versatile",
    "mixtral-8x7b"
  ];

  const hfModels = [
    "mistralai/Mistral-7B-Instruct-v0.3",
    "meta-llama/Llama-3-8B-Instruct"
  ];

  // ---------------- AUTHOR HANDLERS ----------------

  const updateAuthor = (i, field, value) => {
    const copy = [...authors];
    copy[i][field] = value;
    setAuthors(copy);
  };

  const addAuthor = () => {
    if (authors.length >= 6) return;

    setAuthors([
      ...authors,
      { name: "", designation: "", organization: "", location: "", email: "" }
    ]);
  };

  const removeAuthor = (i) => {
    if (authors.length === 1) return;
    setAuthors(authors.filter((_, idx) => idx !== i));
  };

  // ---------------- GENERATE PAPER ----------------

  const generateResearch = async () => {

    if (!topic || !model || !apiKey) {
      alert("Fill all fields first!");
      return;
    }

    setLoading(true);
    setLatex("");
    setPdf(null);

    try {

      const res = await fetch("http://localhost:8000/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          apiKey,
          model,
          topic,
          authors
        }),
      });

      const data = await res.json();

      setLatex(data.latex);
      setPdf(data.pdf);

    } catch {
      alert("Backend error — check server");
    }

    setLoading(false);
  };

  // ---------------- DOWNLOADS ----------------

  const downloadLatex = () => {
    if (!latex) return;

    const blob = new Blob([latex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "research_paper.tex";
    a.click();

    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (!pdf) return;

    const bytes = Uint8Array.from(atob(pdf), c => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "research_paper.pdf";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-30 max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-center font-[font6]">
          AI Research Writer
        </h1>

        {/* Provider */}

        <select
          value={provider}
          onChange={e => {
            setProvider(e.target.value);
            setModel("");
          }}
          className="mb-4 w-full p-3.5 bg-black text-white rounded-full font-[font10] tracking-widest font-bold"
        >
          <option value="groq">Groq</option>
          <option value="hf">Hugging-Face</option>
        </select>

        {/* API key */}

        <input
          placeholder={`Enter ${provider.toUpperCase()} API key`}
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          className="mb-4 w-full p-3 bg-black text-white rounded-full font-mono"
        />

        {/* Model */}

        <select
          value={model}
          onChange={e => setModel(e.target.value)}
          className="mb-4 w-full p-3.5 bg-black text-white rounded-full"
        >
          <option value="">Select model</option>
          {(provider === "groq" ? groqModels : hfModels)
            .map(m => <option key={m}>{m}</option>)}
        </select>

        {/* Topic */}

        <textarea
          placeholder="Enter research topic..."
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="w-full bg-black text-white p-4 h-28 mb-6 rounded-3xl"
        />

        {/* ---------------- AUTHORS SECTION ---------------- */}

        <h2 className="text-2xl font-bold mb-1 mt-5 font-[font10]">
          Authors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-[font9]">

          {authors.map((a, i) => (

            <div
              key={i}
              className="bg-black p-4 rounded-3xl relative space-y-2"
            >

              {/* remove */}

              <button
                onClick={() => removeAuthor(i)}
                className="absolute top-5.5 right-6 text-black font-bold"
              >
                ✕
              </button>

              <input
                placeholder="Name"
                value={a.name}
                onChange={e => updateAuthor(i, "name", e.target.value)}
                className="w-full p-2 rounded-3xl bg-white text-black text-sm"
              />

              <input
                placeholder="Designation"
                value={a.designation}
                onChange={e => updateAuthor(i, "designation", e.target.value)}
                className="w-full p-2 rounded-3xl bg-white text-black text-sm"
              />

              <input
                placeholder="Organization"
                value={a.organization}
                onChange={e => updateAuthor(i, "organization", e.target.value)}
                className="w-full p-2 rounded-3xl bg-white text-black text-sm"
              />

              <input
                placeholder="Location"
                value={a.location}
                onChange={e => updateAuthor(i, "location", e.target.value)}
                className="w-full p-2 rounded-3xl bg-white text-black text-sm"
              />

              <input
                placeholder="Email"
                value={a.email}
                onChange={e => updateAuthor(i, "email", e.target.value)}
                className="w-full p-2 rounded-3xl bg-white text-black text-sm"
              />

            </div>

          ))}

        </div>

        {authors.length < 6 && (

          <button
            onClick={addAuthor}
            className="mt-4 px-5 py-2 mr-13 font-[font10] pt-3 bg-neutral-800 text-white rounded-2xl hover:font-bold"
          >
            Add Author
          </button>

        )}

        {/* Generate */}

        <button
          onClick={generateResearch}
          className="
            mt-6 text-lg px-6 py-1 ml-16
            text-black rounded-2xl
            bg-gradient-to-br from-pink-500 to-orange-400
            font-[font10]
            pt-3 hover:font-bold
            focus:ring-2 focus:outline-none focus:ring-black
          "
        >
          {loading ? "Generating..." : "Generate Paper"}
        </button>

        {/* OUTPUT */}

        {latex && (

          <div className="mt-10 space-y-4">

            <div className="flex gap-4">

              <button
                onClick={downloadLatex}
                className="text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-black dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-3xl hover:font-bold"
              >
                Download TEX
              </button>

              <button
                onClick={downloadPDF}
                className="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-black dark:focus:ring-black font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-3xl hover:font-bold"
              >
                Download PDF
              </button>

              <a
                href="https://www.overleaf.com/project"
                target="_blank"
                className="text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-black dark:focus:ring-teal-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-3xl hover:font-bold"
              >
                Open Overleaf
              </a>

            </div>

            <textarea
              value={latex}
              readOnly
              className="w-full h-[600px] bg-neutral-900 text-green-400 p-6 rounded-xl font-mono text-sm"
            />

          </div>

        )}

      </main>

      <Footer />
    </>
  );
}
