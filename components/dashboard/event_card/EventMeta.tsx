import { calendar_v3 } from "googleapis";
import { Clock, MapPin, Users } from "lucide-react";

type Props = {
  event: calendar_v3.Schema$Event;
  formatDate: (d?: string | null) => string;
  formatTime: (d?: string | null) => string;
  isAllDayEvent: (e: calendar_v3.Schema$Event) => boolean;
};

export function EventMeta({ event, formatDate, formatTime, isAllDayEvent }: Props) {
  return (
    <div className="space-y-2 mb-5 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
        {isAllDayEvent(event) ? (
          <span className="font-medium">All day - {formatDate(event.start?.date)}</span>
        ) : (
          <span>
            <span className="font-medium">{formatDate(event.start?.dateTime)}</span>
            <span className="mx-1">at</span>
            <span className="font-medium">{formatTime(event.start?.dateTime)}</span>
            {event.end?.dateTime && (
              <span className="mx-1">– <span className="font-medium">{formatTime(event.end.dateTime)}</span></span>
            )}
          </span>
        )}
      </div>

      {event.location && (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate font-medium">{event.location}</span>
        </div>
      )}

      {event.attendees?.length ? (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="font-medium">
            {event.attendees.length} attendee{event.attendees.length !== 1 ? "s" : ""}
          </span>
        </div>
      ) : null}
    </div>
  );
}
