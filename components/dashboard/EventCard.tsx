import { calendar_v3 } from "googleapis";
import { Clock, MapPin, Users } from "lucide-react";

type Props = {
  event: calendar_v3.Schema$Event;
  formatDate: (d?: string | null) => string;
  formatTime: (d?: string | null) => string;
  isAllDayEvent: (e: calendar_v3.Schema$Event) => boolean;
};

export function EventCard({ event, formatDate, formatTime, isAllDayEvent }: Props) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{event.summary || "Untitled Event"}</h3>

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
                  {event.end?.dateTime && ` - ${formatTime(event.end.dateTime)}`}
                </span>
              )}
            </div>

            {event.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate max-w-xs">{event.location}</span>
              </div>
            )}

            {event.attendees?.length ? (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{event.attendees.length} attendees</span>
              </div>
            ) : null}
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

        {event.status && (
          <div className="ml-4">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                event.status === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : event.status === "tentative"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {event.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
