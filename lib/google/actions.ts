"use server";

import createOAuth2Client from "@/lib/google/client";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { google } from "googleapis";

export async function connectGoogleCalendar() {
    console.log("Called")
    const oauth2Client = createOAuth2Client();

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    redirect(url);
}

export async function getUserTokens(user_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("google_tokens")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error("Error fetching user tokens:", error.message);
    return null;
  }

  return data;
}

export async function fetchGoogleCalendarEvents(tokens: any) {
  const client = createOAuth2Client();
  client.setCredentials(tokens);

  const calendar = google.calendar({ version: "v3", auth: client });

  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  return res.data.items || [];
}
