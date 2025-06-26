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
        text: `You are an event summarizer assistant that summarizes Google Calendar events.
Summarize the following calendar event in a helpful and informative way, using the time, location, and description (if available).
Write a natural-sounding summary and avoid excessive brevity. Respond with only the summary as plain text.

Event Details:
- Title: ${event.summary || "N/A"}
- Description: ${event.description || "N/A"}
- Start Time: ${event.start?.dateTime || event.start?.date || "N/A"}
- End Time: ${event.end?.dateTime || event.end?.date || "N/A"}
- Location: ${event.location || "N/A"}
- Organizer: ${event.organizer?.displayName || "Unknown"} (${
          event.organizer?.email || "N/A"
        })
- Attendees: ${
          event.attendees?.map((a) => a.displayName || a.email).join(", ") ||
          "None"
        }`,
      },
    ],
  };
}

export async function generateSummary(event: GCalEvent) {
  const { text: summary } = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: createPromptContents(event),
  });

  return summary;
}
