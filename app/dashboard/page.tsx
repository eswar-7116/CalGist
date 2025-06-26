"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connectGoogleCalendar } from "@/lib/google/actions";
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js";
import { calendar_v3 } from "googleapis";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<calendar_v3.Schema$Event[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchUser = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      };

      fetchUser();
    }, []);

    const handleGetEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/google/events");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const response = await res.json();

        if (response) {
          setEvents(response.events);
        } else {
          console.log("Unexpected response:", response);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    const formatDate = (dateString: string | null | undefined) => {
      if (!dateString) return "No date";
      
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    const formatTime = (dateString: string | null | undefined) => {
      if (!dateString) return "";
      
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };

    const isAllDayEvent = (event: calendar_v3.Schema$Event) => {
      return event.start?.date && !event.start?.dateTime;
    };

    return (
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={async () => await connectGoogleCalendar()}>
              <Calendar className="w-4 h-4 mr-2" />
              Connect Google Calendar
            </Button>
            <Button onClick={handleGetEvents} disabled={loading}>
              <Clock className="w-4 h-4 mr-2" />
              {loading ? "Loading..." : "Get Events"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
                {events && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {events.length}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!events ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Click "Get Events" to load your calendar events</p>
                  <p className="text-sm mt-2">Make sure you've connected your Google Calendar first</p>
                </div>
              ) : !Array.isArray(events) || events.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No events found</p>
                  <p className="text-sm mt-2">
                    {!Array.isArray(events) 
                      ? "Check the browser console for API response details"
                      : "Try connecting your Google Calendar or check your calendar for upcoming events"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(events) && events.map((event, index) => (
                    <div
                      key={event.id || index}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {event.summary || "Untitled Event"}
                          </h3>
                          
                          {event.description && (
                            <p className="text-gray-600 mt-1 text-sm">
                              {event.description.length > 100
                                ? `${event.description.substring(0, 100)}...`
                                : event.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {isAllDayEvent(event) ? (
                                <span>All day - {formatDate(event.start?.date)}</span>
                              ) : (
                                <span>
                                  {formatDate(event.start?.dateTime)} at {formatTime(event.start?.dateTime)}
                                  {event.end?.dateTime && 
                                    ` - ${formatTime(event.end.dateTime)}`
                                  }
                                </span>
                              )}
                            </div>

                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span className="truncate max-w-xs">
                                  {event.location}
                                </span>
                              </div>
                            )}

                            {event.attendees && event.attendees.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{event.attendees.length} attendees</span>
                              </div>
                            )}
                          </div>

                          {event.htmlLink && (
                            <div className="mt-2">
                              <a
                                href={event.htmlLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                              >
                                View in Google Calendar
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="ml-4">
                          {event.status && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : event.status === 'tentative'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {event.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    )
}
