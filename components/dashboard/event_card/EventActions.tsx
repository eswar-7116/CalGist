import { calendar_v3 } from "googleapis";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  event: calendar_v3.Schema$Event;
  open: boolean;
  setOpen: (open: boolean) => void;
  summary: string | null;
  loading: boolean;
};

export function EventActions({ event, open, setOpen, summary, loading }: Props) {
  return (
    <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
      {event.htmlLink && (
        <a
          href={event.htmlLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-2 decoration-1 hover:decoration-2 transition-all duration-150"
        >
          View in Google Calendar
        </a>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="cursor-pointer will-change-transform hover:bg-zinc-800 hover:scale-105 transition-all duration-200 shadow-sm font-medium"
          >
            Get Summary
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {event.summary || "Untitled Event"} – Summary
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                Loading summary...
              </div>
            ) : (
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {summary}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
