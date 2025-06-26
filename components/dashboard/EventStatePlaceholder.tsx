import { Calendar, RefreshCw } from "lucide-react";

type Props = { type: "disconnected" | "loading" | "error" | "empty" };

const content = {
  disconnected: {
    icon: <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />,
    title: "Connect your Google Calendar to view events",
    subtitle: 'Click "Connect Google Calendar" to get started',
  },
  loading: {
    icon: <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-50 animate-spin" />,
    title: "Loading your calendar events...",
    subtitle: "",
  },
  error: {
    icon: <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />,
    title: "Unable to load events",
    subtitle: "Try refreshing or check your connection",
  },
  empty: {
    icon: <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />,
    title: "No upcoming events found",
    subtitle: "Your calendar appears to be empty",
  },
};

export function EventStatePlaceholder({ type }: Props) {
  const { icon, title, subtitle } = content[type];
  return (
    <div className="text-center py-8 text-gray-500">
      {icon}
      <p>{title}</p>
      {subtitle && <p className="text-sm mt-2">{subtitle}</p>}
    </div>
  );
}
