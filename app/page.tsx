"use client";

import { useState, useEffect } from "react";

type EventType = "Botez" | "Cununie Civila" | "Majorat" | "Altul";

export default function Home() {
  // Configurare Titlu
  const [eventType, setEventType] = useState<EventType>("Botez");
  const [customTitle, setCustomTitle] = useState("");

  // Timp & Durata
  const [startTime, setStartTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(120);

  // Detalii Descriere
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([""]);
  const [price, setPrice] = useState("");

  // Securitate si Stare
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Incarca API Key salvat local
  useEffect(() => {
    const savedKey = localStorage.getItem("qc_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem("qc_api_key", val);
  };

  // Validare numere doar cifre
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setPhone(onlyDigits);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setPrice(onlyDigits);
  };

  // Gestionare intervale orare multiple
  const handleSlotChange = (index: number, value: string) => {
    const updated = [...timeSlots];
    updated[index] = value;
    setTimeSlots(updated);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, ""]);
  };

  const removeTimeSlot = (index: number) => {
    if (timeSlots.length === 1) {
      setTimeSlots([""]);
      return;
    }
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime) {
      setStatusMessage({ type: "error", text: "Selectează data și ora de start." });
      return;
    }

    const finalTitle = eventType === "Altul" ? customTitle.trim() : eventType;
    if (!finalTitle) {
      setStatusMessage({ type: "error", text: "Completează titlul evenimentului." });
      return;
    }

    // Formatare descriere structurata
    const filteredSlots = timeSlots.map((s) => s.trim()).filter(Boolean);
    const slotsText =
      filteredSlots.length > 0
        ? filteredSlots.map((s) => `  • ${s}`).join("\n")
        : "Nespecificat";

    const formattedDescription = [
      `Eveniment: ${finalTitle}`,
      `Telefon: ${phone || "Nespecificat"}`,
      `Locație: ${location || "Nespecificat"}`,
      `Intervale orare:\n${slotsText}`,
      `Suma: ${price ? `${price} RON` : "Nespecificat"}`,
    ].join("\n\n");

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
          title: finalTitle,
          description: formattedDescription,
          location: location,
          startTime: new Date(startTime).toISOString(),
          durationMinutes: Number(durationMinutes),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "A apărut o eroare la salvare.");
      }

      setStatusMessage({
        type: "success",
        text: "Evenimentul a fost adăugat cu succes în Google Calendar!",
      });

      // Reset partial formulare
      setPhone("");
      setLocation("");
      setTimeSlots([""]);
      setPrice("");
      if (eventType === "Altul") setCustomTitle("");
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-900 p-6 rounded-2xl shadow-xl border border-neutral-800 my-8">
        <h1 className="text-xl font-bold mb-6 text-center text-neutral-100">
          quick-calendar
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nume Eveniment (Selector) */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-2">
              Nume Eveniment
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(["Botez", "Cununie Civila", "Majorat", "Altul"] as EventType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEventType(type)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition ${
                    eventType === type
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {eventType === "Altul" && (
              <input
                type="text"
                placeholder="Specifică tipul evenimentului..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full mt-2.5 p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-blue-500"
                required
              />
            )}
          </div>

          {/* Start & Durata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">
                Ora de start
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">
                Durată (minute)
              </label>
              <input
                type="number"
                min="15"
                step="15"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-4 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Detalii Descriere
            </h2>

            {/* Numar Telefon */}
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">
                Număr telefon
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="07xxxxxxxx"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Locatie */}
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">
                Locație
              </label>
              <input
                type="text"
                placeholder="Restaurant, sală sau adresă..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Intervale Orare Dinamice */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-neutral-400">
                  Interval orar
                </label>
                <button
                  type="button"
                  onClick={addTimeSlot}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                >
                  + Adaugă interval
                </button>
              </div>

              <div className="space-y-2">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ex: 14:00 - 16:00 (Biserică)"
                      value={slot}
                      onChange={(e) => handleSlotChange(index, e.target.value)}
                      className="flex-1 p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-red-400 rounded-lg text-sm transition"
                      title="Șterge interval"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Suma */}
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">
                Sumă (RON)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="ex: 1500"
                value={price}
                onChange={handlePriceChange}
                className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* API Secret Key */}
          <div className="border-t border-neutral-800 pt-4">
            <label className="text-xs font-semibold text-neutral-400 block mb-1">
              API Secret Key (salvată automat în browser)
            </label>
            <input
              type="password"
              placeholder="Cheia ta privată configurată în .env"
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Buton Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition disabled:opacity-50 mt-2"
          >
            {loading ? "Se salvează în calendar..." : "Adaugă Eveniment"}
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