import { type GCalEvent } from "@/validations/GCalEventSchema";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export function createPromptContents(event: GCalEvent) {
  return {
      role: "user",
      parts: [
        {
          text: `You are an AI assistant that summarizes Google Calendar events. Return only the summary as plain text. Be clear and accurate.

Event Details:
- Title: ${event.summary || "N/A"}
- Description: ${event.description || "N/A"}
- Start Time: ${event.start?.dateTime || event.start?.date || "N/A"}
- End Time: ${event.end?.dateTime || event.end?.date || "N/A"}
- Location: ${event.location || "N/A"}
- Organizer: ${event.organizer?.displayName || "Unknown"} (${event.organizer?.email || "N/A"})
- Attendees: ${event.attendees?.map((a) => a.displayName || a.email).join(", ") || "None"}`,
        },
      ],
    }
}

export async function generateSummary(event: GCalEvent) {
  const { text: summary } = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createPromptContents(event),
  });

  return summary;
}
