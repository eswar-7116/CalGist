"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { calendar_v3 } from "googleapis";
import { createClient } from "@/lib/supabase/client";
import { connectGoogleCalendar, getUserTokens } from "@/lib/google/actions";

import { ConnectButton } from "@/components/dashboard/ConnectButton";
import { EventList } from "@/components/dashboard/EventList";
import { ErrorBanner } from "@/components/dashboard/ErrorBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<calendar_v3.Schema$Event[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isAllDayEvent = (event: calendar_v3.Schema$Event) => {
    return !!event.start?.date && !event.start?.dateTime;
  };

  const checkGoogleConnection = async (userId: string) => {
    try {
      const tokens = await getUserTokens(userId);
      const connected = !!tokens;
      setIsConnected(connected);
      return connected;
    } catch (err) {
      console.error("Error checking Google connection:", err);
      setIsConnected(false);
      return false;
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/google/events");
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const json = await res.json();
      setEvents(json.events || []);
    } catch (err) {
      console.error("Failed to fetch events", err);
      setError("Failed to fetch events. Please try again.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setError(null);
      await connectGoogleCalendar();
      if (user?.id) {
        const connected = await checkGoogleConnection(user.id);
        if (connected) await fetchEvents();
      }
    } catch (err) {
      console.error("Connection error", err);
      setError("Failed to connect to Google Calendar. Please try again.");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const connected = await checkGoogleConnection(user.id);
        if (connected) await fetchEvents();
      }
    };
    initialize();
  }, []);

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ConnectButton
          isConnected={isConnected}
          loading={loading}
          onConnect={handleConnect}
          onRefresh={fetchEvents}
        />
      </div>

      {error && <ErrorBanner message={error} />}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Upcoming Events
            {events && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {events.length}
              </span>
            )}
            {isConnected && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Connected
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EventList
            events={events}
            loading={loading}
            isConnected={isConnected}
            formatDate={formatDate}
            formatTime={formatTime}
            isAllDayEvent={isAllDayEvent}
          />
        </CardContent>
      </Card>
    </main>
  );
}
