"use client";

import { Button } from "@/components/ui/button";
import { Calendar, RefreshCw } from "lucide-react";

type Props = {
  isConnected: boolean;
  loading: boolean;
  onConnect: () => void;
  onRefresh: () => void;
};

export function ConnectButton({ isConnected, loading, onConnect, onRefresh }: Props) {
  return isConnected ? (
    <Button onClick={onRefresh} disabled={loading} variant="outline">
      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
      {loading ? "Refreshing..." : "Refresh Events"}
    </Button>
  ) : (
    <Button onClick={onConnect} disabled={loading}>
      <Calendar className="w-4 h-4 mr-2" />
      Connect Google Calendar
    </Button>
  );
}
