import { calendar_v3 } from "googleapis";
import { EventCard } from "./EventCard";
import { EventStatePlaceholder } from "./EventStatePlaceholder";

type Props = {
  events: calendar_v3.Schema$Event[] | null;
  loading: boolean;
  isConnected: boolean;
  formatDate: (d?: string | null) => string;
  formatTime: (d?: string | null) => string;
  isAllDayEvent: (e: calendar_v3.Schema$Event) => boolean;
};

export function EventList({
  events,
  loading,
  isConnected,
  formatDate,
  formatTime,
  isAllDayEvent,
}: Props) {
  if (!isConnected) return <EventStatePlaceholder type="disconnected" />;
  if (loading && !events) return <EventStatePlaceholder type="loading" />;
  if (!loading && !events) return <EventStatePlaceholder type="error" />;
  if (events?.length === 0 || events === null) return <EventStatePlaceholder type="empty" />;

  return (
    <div className="space-y-4">
      {events.map((event, i) => (
        <EventCard
          key={event.id || i}
          event={event}
          formatDate={formatDate}
          formatTime={formatTime}
          isAllDayEvent={isAllDayEvent}
        />
      ))}
    </div>
  );
}
