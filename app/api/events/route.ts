import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

interface CreateEventPayload {
  title: string;
  description?: string;
  location?: string;
  startTime: string; // ISO 8601 string
  durationMinutes?: number;
}

function validatePayload(body: any): { valid: boolean; error?: string } {
  if (!body.title || typeof body.title !== "string") {
    return { valid: false, error: "Câmpul 'title' este obligatoriu." };
  }
  if (!body.startTime || isNaN(Date.parse(body.startTime))) {
    return { valid: false, error: "Format invalid pentru 'startTime'." };
  }
  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verificare protecție token (să nu îți poată apela oricine endpoint-ul public)
    const authHeader = request.headers.get("x-api-key");
    if (authHeader !== process.env.API_SECRET_KEY) {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
    }

    const body: CreateEventPayload = await request.json();
    const validation = validatePayload(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 2. Inițializare Google Auth
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientEmail || !privateKey || !calendarId) {
      return NextResponse.json(
        { error: "Configurație server incompletă." },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // 3. Calcul interval orar
    const start = new Date(body.startTime);
    const duration = body.durationMinutes && body.durationMinutes > 0 ? body.durationMinutes : 60;
    const end = new Date(start.getTime() + duration * 60 * 1000);

    // 4. Creare eveniment
    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: body.title,
        description: body.description ?? "",
        location: body.location ?? "",
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
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