import { calendar_v3 } from "googleapis";

export function EventHeader({ event }: { event: calendar_v3.Schema$Event }) {
  return (
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-semibold text-xl text-gray-900 leading-tight">
        {event.summary || "Untitled Event"}
      </h3>
      {event.status && (
        <span
          className={`ml-3 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            event.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : event.status === "tentative"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {event.status}
        </span>
      )}
    </div>
  );
}
