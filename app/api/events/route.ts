import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

interface CreateEventPayload {
  title: string;
  description: string;
  location: string;
  startTime: string;
  durationMinutes: number;
  colorId?: string; 
}

function validatePayload(body: any): { valid: boolean; error?: string } {
  if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
    return { valid: false, error: "Câmpul 'title' este obligatoriu." };
  }
  if (!body.startTime || isNaN(Date.parse(body.startTime))) {
    return { valid: false, error: "Format invalid pentru 'startTime'." };
  }
  if (!body.durationMinutes || body.durationMinutes <= 0) {
    return { valid: false, error: "Durata trebuie să fie mai mare de 0." };
  }
  if (!body.description || typeof body.description !== "string" || !body.description.trim()) {
    return { valid: false, error: "Descrierea este obligatorie." };
  }
  if (!body.location || typeof body.location !== "string" || !body.location.trim()) {
    return { valid: false, error: "Locația este obligatorie." };
  }
  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-api-key");
    if (!authHeader || authHeader !== process.env.API_SECRET_KEY) {
      return NextResponse.json({ error: "Neautorizat: API Key incorect." }, { status: 401 });
    }

    const body: CreateEventPayload = await request.json();
    const validation = validatePayload(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientEmail || !privateKey || !calendarId) {
      return NextResponse.json(
        { error: "Configurație server Google Calendar incompletă." },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const start = new Date(body.startTime);
    const end = new Date(start.getTime() + body.durationMinutes * 60 * 1000);

    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: body.title.trim(),
        description: body.description.trim(),
        location: body.location.trim(),
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
        colorId: body.colorId || "11",
      },
    });

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
    });
  } catch (error: any) {
    console.error("Eroare Google Calendar API:", error);
    return NextResponse.json(
      { error: error.message || "Eroare internă la crearea evenimentului." },
      { status: 500 }
    );
  }
}