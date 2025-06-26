"use client";
import { Zap } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";

export function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Welcome to <span className="text-blue-600">CalGist</span>!
      </h1>

      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
        Transform your calendar chaos into organized clarity. Connect your Google Calendar and get intelligent insights about your schedule, productivity patterns, and time management.
      </p>

      <AuthButton
        size="lg"
        className="cursor-pointer px-8 py-3 text-lg font-semibold will-change-transform hover:scale-106"
      >
        <Zap className="w-5 h-5 mr-2" />
        Get Started
      </AuthButton>
    </div>
  );
}
