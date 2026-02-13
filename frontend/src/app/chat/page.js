"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import LiquidEther from "@/components/LiquidEther";

export default function ChatPage() {

  const router = useRouter();

  // =========================
  // Sessions
  // =========================

  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState({});
  const [titles, setTitles] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // LLM settings
  // =========================

  const [provider, setProvider] = useState("groq");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");

  const groqModels = [
    "llama-3.3-70b-versatile",
    "mixtral-8x7b"
  ];

  const hfModels = [
    "mistralai/Mistral-7B-Instruct-v0.3",
    "meta-llama/Llama-3-8B-Instruct"
  ];

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // =========================
  // Session controls
  // =========================

  const createSession = () => {

    const id = uuidv4();

    setSessions(prev => [...prev, id]);
    setActiveSession(id);

    setMessages(prev => ({ ...prev, [id]: [] }));
    setTitles(prev => ({ ...prev, [id]: "New Chat" }));
  };

  const deleteSession = (id) => {

    setSessions(prev => prev.filter(s => s !== id));

    if (activeSession === id) setActiveSession(null);

    setMenuOpen(null);
  };

  const renameSession = (id) => {

    const name = prompt("Rename chat:");

    if (!name) return;

    setTitles(prev => ({ ...prev, [id]: name }));

    setMenuOpen(null);
  };

  // =========================
  // Send message
  // =========================

  const sendMessage = async () => {

    if (!input || !activeSession) return;

    const userMsg = { role: "user", text: input };

    setMessages(prev => ({
      ...prev,
      [activeSession]: [...(prev[activeSession] || []), userMsg]
    }));

    setInput("");
    setLoading(true);

    try {

      const res = await fetch("http://localhost:8000/chat/message", {

        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({

          session_id: activeSession,
          provider,
          apiKey,
          model,
          message: userMsg.text

        }),

      });

      const data = await res.json();

      const botMsg = { role: "assistant", text: data.reply };

      setMessages(prev => ({
        ...prev,
        [activeSession]: [...prev[activeSession], botMsg]
      }));

    } catch {

      alert("Backend error");

    }

    setLoading(false);
  };

  // =========================
  // UI
  // =========================

  return (

    <div className="flex flex-col h-screen font-sans">

      {/* ================= NAVBAR ================= */}

      {/* <div
        className="flex justify-between items-center px-6 py-3 text-white"
        style={{ background: "#000000", position: "relative" }}
      >
        <LiquidEther
    colors={[ '#da7757', '#f2e9d7', '#c15f3c' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
    color0="#da7757"
    color1="#f2e9d7"
    color2="#c15f3c"
/>

        <div
          className="text-lg font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          AI Workspace
        </div>

        <div className="flex gap-6 text-sm">

          <button onClick={() => router.push("/")}>
            Dashboard
          </button>

          <button onClick={() => router.push("/tools")}>
            Tools
          </button>

          <button onClick={() => router.push("/about")}>
            About
          </button>

        </div>

      </div> */}
      <div
        className="relative flex justify-between items-center px-15 py-3 text-white overflow-hidden"
        style={{ background: "#000000" }}
        >

        {/* ===== Background Liquid Layer ===== */}

        <div className="absolute inset-0 z-0">

            <LiquidEther
            colors={['#da7757', '#f2e9d7', '#c15f3c']}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            color0="#da7757"
            color1="#f2e9d7"
            color2="#c15f3c"
            />

        </div>

        {/* ===== Foreground Content ===== */}

        <div className="relative z-10 text-2xl font-bold cursor-pointer font-[font1] tracking-widest pl-2"
            onClick={() => router.push("/")}>
            AI Workspace
        </div>

        <div className="relative z-10 flex text-base font-[font10] pt-1 gap-10">

            <button className="hover:font-bold" onClick={() => router.push("/")}>
            Dashboard
            </button>

            <button className="hover:font-bold" onClick={() => router.push("/tools")}>
            Tools
            </button>

            <button className="hover:font-bold" onClick={() => router.push("/about")}>
            About
            </button>

        </div>

        </div>


      {/* ================= MAIN LAYOUT ================= */}

      <div className="flex flex-1">

        {/* SIDEBAR */}

        <div
          className="w-72 flex flex-col p-4 text-white"
          style={{ background: "#da7757" }}
        >

          <select
            value={provider}
            onChange={e => {
              setProvider(e.target.value);
              setModel("");
            }}
            className="mb-2 p-2 rounded text-black font-[font10]"
          >
            <option value="groq">Groq</option>
            <option value="hf">HuggingFace</option>
          </select>

          <input
            placeholder="API key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="mb-2 p-2 rounded text-black font-sans"
          />

          <select
            value={model}
            onChange={e => setModel(e.target.value)}
            className="mb-3 p-2 rounded text-black font-[font]"
          >
            <option>Select model</option>

            {(provider === "groq"
              ? groqModels
              : hfModels
            ).map(m => <option key={m}>{m}</option>)}
          </select>

          <button
            onClick={createSession}
            className="bg-white text-black rounded pb-1 mb-3 font-medium font-[font10] pt-2"
          >
            New Chat
          </button>

          <div className="flex-1 overflow-y-auto space-y-2 font-[font10]">

            {sessions.map(id => (

              <div
                key={id}
                className={`
                  relative flex justify-between items-center
                  p-2 rounded cursor-pointer
                  ${activeSession === id
                    ? "bg-white/30"
                    : "bg-white/10"}
                `}
                onClick={() => setActiveSession(id)}
              >

                <span className="truncate">
                  {titles[id]}
                </span>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === id ? null : id);
                  }}
                >
                  ⋮
                </button>

                {menuOpen === id && (

                  <div className="
                    absolute right-0 top-8
                    bg-white text-black rounded shadow
                  ">

                    <button
                      className="block px-3 py-1 hover:bg-gray-200 w-full text-left"
                      onClick={() => renameSession(id)}
                    >
                      Rename
                    </button>

                    <button
                      className="block px-3 py-1 hover:bg-gray-200 w-full text-left"
                      onClick={() => deleteSession(id)}
                    >
                      Delete
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

        {/* CHAT AREA */}

        <div
          className="flex-1 flex flex-col"
          style={{ background: "#f2e9d7" }}
        >

          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {(messages[activeSession] || []).map((msg, i) => (

              <div
                key={i}
                className={`
                  max-w-3xl p-4 rounded-xl shadow-sm
                  ${msg.role === "user"
                    ? "ml-auto bg-[#da7757] text-white"
                    : "bg-white text-black"}
                `}
              >

                <ReactMarkdown>
                  {msg.text}
                </ReactMarkdown>

              </div>

            ))}

            {loading && (
              <div className="text-gray-600">
                AI is thinking…
              </div>
            )}

            <div ref={endRef} />

          </div>

          <div className="p-4 flex gap-3 border-t border-gray-300">

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded border border-gray-300"
            />

            <button
              onClick={sendMessage}
              className="
                px-6 rounded
                bg-[#da7757] text-white font-medium
              "
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}
