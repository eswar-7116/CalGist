"use client";
import { Calendar } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";

export function CTA() {
  return (
    <div className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Ready to optimize your calendar?
      </h2>
      <p className="text-gray-600 mb-6">
        Join thousands of users who have transformed their time management with CalGist.
      </p>
      <AuthButton
        size="lg"
        className="cursor-pointer px-8 py-3 text-lg font-semibold will-change-transform hover:scale-106"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Start Your Journey
      </AuthButton>
    </div>
  );
}
