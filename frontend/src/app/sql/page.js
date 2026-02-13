"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function SQLTool() {

  // =========================
  // LLM + DB state
  // =========================

  const [provider] = useState("groq");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("llama-3.1-8b-instant");

  const [dbType, setDbType] = useState("sqlite");

  const [sqlitePath, setSqlitePath] = useState("workspace.db");

  const [mysqlHost, setMysqlHost] = useState("");
  const [mysqlUser, setMysqlUser] = useState("");
  const [mysqlPassword, setMysqlPassword] = useState("");
  const [mysqlDB, setMysqlDB] = useState("");

  // =========================
  // Chat state
  // =========================

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const groqModels = [
    "llama-3.1-8b-instant",
    "llama-3.3-70b-versatile"
  ];

  // =========================
  // Send SQL command
  // =========================

  const sendQuery = async () => {

    if (!apiKey || !input) {
      alert("Enter API key + command");
      return;
    }

    setLoading(true);

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    try {

      const dbPayload =
        dbType === "sqlite"
          ? { type: "sqlite", sqlite_path: sqlitePath }
          : {
              type: "mysql",
              host: mysqlHost,
              user: mysqlUser,
              password: mysqlPassword,
              database: mysqlDB
            };

      const res = await fetch("http://localhost:8000/sql/chat", {

        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({

          provider,
          apiKey,
          model,
          database: dbPayload,
          message: input

        })

      });

      const data = await res.json();

      const aiMsg = {

        role: "assistant",
        sql: data.sql_generated,
        result: data.result

      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "⚠ Backend error" }
      ]);

    }

    setInput("");
    setLoading(false);
  };

  // =========================
  // Render result table
  // =========================

  const renderTable = (rows) => {

    if (!Array.isArray(rows) || rows.length === 0)
      return <p className="text-sm text-gray-500">No rows returned</p>;

    const headers = Object.keys(rows[0]);

    return (

      <table className="w-full text-sm border mt-2">

        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} className="border px-2 py-1 bg-gray-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {headers.map(h => (
                <td key={h} className="border px-2 py-1">
                  {String(r[h])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>

    );
  };

  // =========================
  // UI
  // =========================

  return (

    <>

      <Navbar />

      <div className="flex h-screen pt-20">

        {/* ================= Sidebar ================= */}

        <div className="w-80 bg-gray-100 p-4 space-y-4 overflow-y-auto">

          <h2 className="font-bold">LLM Settings</h2>

          <input
            placeholder="Groq API Key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select
            value={model}
            onChange={e => setModel(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {groqModels.map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <hr />

          <h2 className="font-bold">Database</h2>

          <select
            value={dbType}
            onChange={e => setDbType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="sqlite">SQLite</option>
            <option value="mysql">MySQL</option>
          </select>

          {dbType === "sqlite" && (

            <input
              placeholder="SQLite file path"
              value={sqlitePath}
              onChange={e => setSqlitePath(e.target.value)}
              className="w-full border p-2 rounded"
            />

          )}

          {dbType === "mysql" && (

            <>

              <input
                placeholder="Host"
                value={mysqlHost}
                onChange={e => setMysqlHost(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                placeholder="User"
                value={mysqlUser}
                onChange={e => setMysqlUser(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                placeholder="Password"
                type="password"
                value={mysqlPassword}
                onChange={e => setMysqlPassword(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                placeholder="Database"
                value={mysqlDB}
                onChange={e => setMysqlDB(e.target.value)}
                className="border p-2 rounded"
              />

            </>

          )}

        </div>

        {/* ================= Chat Area ================= */}

        <div className="flex-1 flex flex-col">

          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {messages.map((msg, i) => (

              <div key={i}>

                {msg.role === "user" && (

                  <div className="bg-blue-500 text-white p-3 rounded max-w-xl ml-auto">
                    {msg.text}
                  </div>

                )}

                {msg.role === "assistant" && (

                  <div className="bg-gray-200 p-4 rounded max-w-4xl">

                    {msg.sql && (

                      <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
                        {msg.sql}
                      </pre>

                    )}

                    {renderTable(msg.result)}

                  </div>

                )}

              </div>

            ))}

            {loading && <p>AI executing query...</p>}

          </div>

          {/* Input */}

          <div className="p-4 border-t flex gap-3">

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask database..."
              className="flex-1 border p-3 rounded"
              onKeyDown={e => e.key === "Enter" && sendQuery()}
            />

            <button
              onClick={sendQuery}
              className="bg-black text-white px-6 rounded"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </>

  );
}
