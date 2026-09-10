"use client";

import { useState } from "react";

const TEMPLATES = [
  {
    name: "Antrenament",
    title: "Calisthenics / Workout",
    duration: 90,
    desc: "- Încălzire articulații & mobilitate\n- Skill work\n- Seturi principale\n- Stretching",
  },
  {
    name: "Meeting / Sincronizare",
    title: "Ședință Proiect",
    duration: 30,
    desc: "- Status update\n- Blocaje & Next steps",
  },
];

export default function Home() {
  const [title, setTitle] = useState(TEMPLATES[0].title);
  const [desc, setDesc] = useState(TEMPLATES[0].desc);
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(TEMPLATES[0].duration);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const applyTemplate = (tpl: typeof TEMPLATES[0]) => {
    setTitle(tpl.title);
    setDesc(tpl.desc);
    setDuration(tpl.duration);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startTime) {
      setStatusMessage({ type: "error", text: "Selectează data și ora de start." });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          title,
          description: desc,
          startTime: new Date(startTime).toISOString(),
          durationMinutes: Number(duration),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la salvare");

      setStatusMessage({ type: "success", text: "Evenimentul a fost adăugat silențios în Google Calendar!" });
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-800 p-6 rounded-2xl shadow-xl border border-neutral-700">
        <h1 className="text-xl font-bold mb-4 text-center">Adăugare Eveniment</h1>

        {/* Butoane Șabloane */}
        <div className="flex gap-2 mb-5">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.name}
              type="button"
              onClick={() => applyTemplate(tpl)}
              className="flex-1 py-1.5 px-3 text-xs bg-neutral-700 hover:bg-neutral-600 rounded-lg transition"
            >
              {tpl.name}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-400">Titlu</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-neutral-400">Data & Ora Start</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full mt-1 p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 focus:outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-400">Durată (min)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full mt-1 p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-400">Descriere / Checklist</label>
            <textarea
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full mt-1 p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 focus:outline-none focus:border-blue-500 font-mono text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-400">API Key (Securitate)</label>
            <input
              type="password"
              placeholder="Cheia ta privată"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full mt-1 p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 focus:outline-none focus:border-blue-500 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-medium rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Se trimite în Calendar..." : "Adaugă Eveniment"}
          </button>
        </form>

        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              statusMessage.type === "success"
                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                : "bg-rose-950 text-rose-300 border border-rose-800"
            }`}
          >
            {statusMessage.text}
          </div>
        )}
      </div>
    </main>
  );
}