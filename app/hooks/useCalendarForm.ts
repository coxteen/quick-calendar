import { useState, useEffect } from "react";
import { EventType } from "../components/EventTypeSelector";
import { ScheduleItem } from "../components/SchedulePairsInput";

export function useCalendarForm() {
  const [eventType, setEventType] = useState<EventType>("Botez");
  const [customTitle, setCustomTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { location: "", timeSlot: "" },
  ]);
  const [price, setPrice] = useState("");

  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [colorId, setColorId] = useState("11");

  useEffect(() => {
    const savedKey = localStorage.getItem("qc_api_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem("qc_api_key", val);
  };

  const handleScheduleItemChange = (
    index: number,
    field: keyof ScheduleItem,
    val: string
  ) => {
    const next = [...scheduleItems];
    next[index] = { ...next[index], [field]: val };
    setScheduleItems(next);
  };

  const addScheduleItem = () => {
    setScheduleItems([...scheduleItems, { location: "", timeSlot: "" }]);
  };

  const removeScheduleItem = (index: number) => {
    if (scheduleItems.length === 1) {
      setScheduleItems([{ location: "", timeSlot: "" }]);
      return;
    }
    setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const finalTitle = eventType === "Altul" ? customTitle.trim() : eventType;
    const hasEmptySchedule = scheduleItems.some(
      (item) => !item.location.trim() || !item.timeSlot.trim()
    );

    if (
      !finalTitle ||
      !eventDate ||
      !startTime ||
      !endTime ||
      !contactName.trim() ||
      !phone.trim() ||
      hasEmptySchedule ||
      !price.trim() ||
      !apiKey.trim()
    ) {
      setStatusMessage({ type: "error", text: "Toate câmpurile sunt obligatorii." });
      return;
    }

    const startDateTime = new Date(`${eventDate}T${startTime}:00`);
    let endDateTime = new Date(`${eventDate}T${endTime}:00`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      setStatusMessage({ type: "error", text: "Intervalul orar este invalid." });
      return;
    }

    if (endDateTime <= startDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }

    const durationMinutes = Math.round(
      (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60)
    );

    const scheduleFormatted = scheduleItems
      .map((item) => `${item.location.trim()} ---> ${item.timeSlot.trim()}`)
      .join("\n");

    // Format descriere cu Contact (Nume ---> Numar de telefon)
    const formattedDescription = [
      `${contactName.trim()} ---> ${phone.trim()}`,
      scheduleFormatted,
      `Suma ---> ${price.trim()} lei`,
    ].join("\n\n");

    const allLocations = scheduleItems
      .map((item) => item.location.trim())
      .filter(Boolean)
      .join(", ");

    setLoading(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey.trim(),
        },
        body: JSON.stringify({
          title: finalTitle,
          description: formattedDescription,
          location: allLocations,
          startTime: startDateTime.toISOString(),
          durationMinutes,
          colorId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la salvare.");

      setStatusMessage({
        type: "success",
        text: "Evenimentul a fost adăugat cu succes în Google Calendar!",
      });

      setContactName("");
      setPhone("");
      setScheduleItems([{ location: "", timeSlot: "" }]);
      setPrice("");
      setEventDate("");
      setStartTime("");
      setEndTime("");
      if (eventType === "Altul") setCustomTitle("");
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      eventType,
      customTitle,
      eventDate,
      startTime,
      endTime,
      contactName,
      phone,
      scheduleItems,
      price,
      apiKey,
      loading,
      statusMessage,
      colorId,
    },
    actions: {
      setEventType,
      setCustomTitle,
      setEventDate,
      setStartTime,
      setEndTime,
      setContactName,
      setPhone: (val: string) => setPhone(val.replace(/\D/g, "")),
      handleScheduleItemChange,
      addScheduleItem,
      removeScheduleItem,
      setPrice: (val: string) => setPrice(val.replace(/\D/g, "")),
      handleApiKeyChange,
      handleSubmit,
      setColorId,
    },
  };
}