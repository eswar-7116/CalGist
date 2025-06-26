"use client";

import { useState } from "react";
import { calendar_v3 } from "googleapis";
import { EventHeader } from "@/components/dashboard/event_card/EventHeader";
import { EventDescription } from "@/components/dashboard/event_card/EventDescription";
import { EventMeta } from "@/components/dashboard/event_card/EventMeta";
import { EventActions } from "@/components/dashboard/event_card/EventActions";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Props = {
  event: calendar_v3.Schema$Event;
  formatDate: (d?: string | null) => string;
  formatTime: (d?: string | null) => string;
  isAllDayEvent: (e: calendar_v3.Schema$Event) => boolean;
};

async function getSummary(event: calendar_v3.Schema$Event) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("summaries")
      .select("summary")
      .eq("event_id", event.id)
      .single();

    if (error?.code === "PGRST116" && !data) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("Unauthorized generation");
        return null;
      }

      const response = await fetch("/api/gen-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event }),
      });
      const { summary } = await response.json();
      if (!summary) {
        console.error("Summary generation failed");
        toast.error("Summary generation failed");
        return null;
      }

      const { error } = await supabase.from("summaries").insert([
        {
          user_id: user.id,
          event_id: event.id,
          summary: summary,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) {
        console.error("Failed to save summary:", error);
        toast.error("Failed to save summary");
      }

      return summary;
    }

    if (error) {
      console.error("Error fetching summary:", error);
      return null;
    }

    return data.summary;
  } catch (err) {
    console.error("Unexpected error in getSummary:", err);
    return null;
  }
}

export function EventCard({
  event,
  formatDate,
  formatTime,
  isAllDayEvent,
}: Props) {
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const regenerateSummary = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in.");
        return;
      }

      const response = await fetch("/api/gen-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event }),
      });

      const { summary: newSummary } = await response.json();

      if (!newSummary) {
        toast.error("Summary regeneration failed.");
        return;
      }

      const { error: saveErr } = await supabase.from("summaries").update({
        summary: newSummary,
        created_at: new Date().toISOString(),
      }).eq("event_id", event.id);

      if (saveErr) {
        console.error("Failed to save regenerated summary:", saveErr.message);
        toast.error("Failed to save regenerated summary.");
        return;
      }

      toast.success("Summary regenerated!");
      setSummary(newSummary);
    } catch (err) {
      console.error("Error regenerating summary:", err);
      toast.error("Unexpected error during regeneration.");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpenChange = async (open: boolean) => {
    setSummaryDialogOpen(open);
    if (open && !summary) {
      setLoading(true);

      const result = await getSummary(event);
      setSummary(result);

      setLoading(false);
    }
  };

  return (
    <div className="group border border-gray-200 rounded-xl p-6 hover:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all duration-200 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <EventHeader event={event} />
          <EventDescription description={event.description} />
          <EventMeta
            event={event}
            formatDate={formatDate}
            formatTime={formatTime}
            isAllDayEvent={isAllDayEvent}
          />
          <EventActions
            event={event}
            summary={summary || "Failed to fetch summary"}
            loading={loading}
            open={summaryDialogOpen}
            setOpen={handleDialogOpenChange}
            onRegenerate={regenerateSummary}
          />
        </div>
      </div>
    </div>
  );
}
