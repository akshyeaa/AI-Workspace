// "use client";

// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";



// export default function Summarizer() {

//   const [provider, setProvider] = useState("groq");
//   const [apiKey, setApiKey] = useState("");
//   const [model, setModel] = useState("llama-3.1-8b-instant");
//   const [url, setUrl] = useState("");
//   const [file, setFile] = useState(null);

//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);

//   const groqModels = [
//     "llama-3.1-8b-instant",
//     "llama-3.3-70b-versatile"
//   ];

//   // =========================
//   // Summarize
//   // =========================

//   const summarize = async () => {

//     if (!apiKey || !model) {
//       alert("Fill API key + model");
//       return;
//     }

//     if (!file && !url) {
//       alert("Upload PDF OR provide URL");
//       return;
//     }

//     setLoading(true);
//     setSummary("");

//     try {

//       const form = new FormData();

//       // REQUIRED backend fields
//       form.append("provider", provider);
//       form.append("apiKey", apiKey);
//       form.append("model", model);

//       // optional inputs
//       if (url) form.append("url", url);
//       if (file) form.append("file", file);

//       const res = await fetch("http://localhost:8000/summarize", {
//         method: "POST",
//         body: form
//       });

//       const data = await res.json();

//       setSummary(data.summary || "No summary returned");

//     } catch (err) {

//       console.error(err);
//       alert("Summarization failed");

//     }

//     setLoading(false);
//   };

//   // =========================
//   // UI
//   // =========================

//   return (

//     <div className="p-10 max-w-4xl mx-auto space-y-5">

//       <h1 className="text-3xl font-bold font-[font10]">
//         AI Summarizer
//       </h1>

//       {/* Provider */}

//       <select
//         value={provider}
//         onChange={e => setProvider(e.target.value)}
//         className="border p-2 w-full rounded"
//       >
//         <option value="groq">Groq</option>
//       </select>

//       {/* API */}

//       <input
//         placeholder="Groq API Key"
//         value={apiKey}
//         onChange={e => setApiKey(e.target.value)}
//         className="border p-2 w-full rounded"
//       />

//       {/* Model */}

//       <select
//         value={model}
//         onChange={e => setModel(e.target.value)}
//         className="border p-2 w-full rounded"
//       >
//         {groqModels.map(m => (
//           <option key={m} value={m}>{m}</option>
//         ))}
//       </select>

//       {/* URL */}

//       <input
//         placeholder="Paste URL (optional)"
//         value={url}
//         onChange={e => setUrl(e.target.value)}
//         className="border p-2 w-full rounded"
//       />

//       {/* File */}

//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={e => setFile(e.target.files[0])}
//         className="border p-2 w-full rounded"
//       />

//       {/* Button */}

//       <button
//         onClick={summarize}
//         className="bg-black text-white px-6 py-2 rounded"
//       >
//         {loading ? "Summarizing..." : "Summarize"}
//       </button>

//       {/* Result */}

//       {summary && (

//             <div className="p-5 bg-gray-100 rounded border">

//       <ReactMarkdown remarkPlugins={[remarkGfm]}>
//         {summary}
//       </ReactMarkdown>

//             </div>


//       )}

//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Summarizer() {

  const [provider, setProvider] = useState("groq");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("llama-3.1-8b-instant");

  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const groqModels = [
    "llama-3.1-8b-instant",
    "llama-3.3-70b-versatile"
  ];

  // =========================
  // Summarize
  // =========================

  const summarize = async () => {

    if (!apiKey) return;

    if (!file && !url) {
      alert("Upload PDF OR provide URL");
      return;
    }

    setLoading(true);
    setSummary("");

    try {

      const form = new FormData();

      form.append("provider", provider);
      form.append("apiKey", apiKey);
      form.append("model", model);

      if (url) form.append("url", url);
      if (file) form.append("file", file);

      const res = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        body: form
      });

      const data = await res.json();
      setSummary(data.summary || "No summary returned");

    } catch (err) {

      console.error(err);
      alert("Summarization failed");

    }

    setLoading(false);
  };

  // =========================
  // UI
  // =========================

  return (

    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-50">

        {/* ================= HERO ================= */}

        <section className="text-center px-6 py-16 max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-2 mt-16 font-[font10]">
            Summarizer
          </h1>

          <p className="text-sm text-gray-600 max-w-3xl mx-auto font-[font9]">
            Instantly compress long documents, articles, or videos into
            meaningful summaries using AI. Upload a PDF or paste a link —
            let intelligent summarization extract what truly matters.
          </p>

        </section>

        {/* ================= SETTINGS ================= */}

        <section className="max-w-5xl mx-auto px-6 mb-10">

          <div className="bg-white border rounded-xl p-5 shadow-sm grid md:grid-cols-3 gap-4">

            <select
              value={provider}
              onChange={e => setProvider(e.target.value)}
              className="border p-1 pt-2 rounded font-[font11] tracking-widest"
            >
              <option value="groq">&nbsp;&nbsp;&nbsp;Groq</option>
            </select>

            <input
              placeholder="Groq API Key"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="border p-2 rounded"
            />

            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="border p-2 rounded"
            >
              {groqModels.map(m => (
                <option key={m}>{m}</option>
              ))}
            </select>

          </div>

        </section>

        {/* ================= MAIN INPUT ================= */}

        <section className="max-w-5xl mx-auto px-6 mb-10">

          <div className="bg-white border rounded-xl p-8 shadow-md space-y-6">

            <input
              placeholder="Paste URL to summarize..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="border p-3 w-full rounded"
            />

            <div className="text-center text-gray-500">
              — OR —
            </div>

            <input
              type="file"
              accept="application/pdf"
              onChange={e => setFile(e.target.files[0])}
              className="border p-3 w-full rounded"
            />

            <button
              onClick={summarize}
              disabled={!apiKey || loading}
              className={`
                w-full py-3 rounded font-semibold
                ${apiKey
                  ? "bg-black text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}
              `}
            >
              {loading ? "Summarizing…" : "Summarize"}
            </button>

          </div>

        </section>

        {/* ================= OUTPUT ================= */}

        {summary && (

          <section className="max-w-5xl mx-auto px-6 pb-16">

            <div className="bg-white border rounded-xl p-8 shadow-md">

              <h2 className="text-xl font-bold mb-4">
                Summary
              </h2>

              <div className="prose max-w-none">

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {summary}
                </ReactMarkdown>

              </div>

            </div>

          </section>

        )}

      </main>
    </>
  );
}
