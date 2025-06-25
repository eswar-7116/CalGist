"use client";

import { Button } from "@/components/ui/button";
import { connectGoogleCalendar, getUserTokens } from "@/lib/google/actions";
import createOAuth2Client from "@/lib/google/client";
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js";
import { calendar_v3, google } from "googleapis";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<calendar_v3.Schema$Event[] | null>();

    useEffect(() => {
      const fetchUser = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      };

      fetchUser();
    }, []);

    const handleGetEvents = async () => {
      const res = await fetch("/api/google/events");
      const fetched_events = await res.json();
      setEvents(fetched_events);
    }

    return (
      <main>
        <Button onClick={async () => await connectGoogleCalendar()}>
          Connect Google Calendar
        </Button>
        <Button onClick={handleGetEvents}>
          Get Events
        </Button>
        <h1>Events:</h1>
        <p>{JSON.stringify(events)}</p>
      </main>
    )
}