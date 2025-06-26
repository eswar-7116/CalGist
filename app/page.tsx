import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Bot, Calendar, LayoutDashboard, Zap } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">CalGist</span>!
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your calendar chaos into organized clarity. Connect your
            Google Calendar and get intelligent insights about your schedule,
            productivity patterns, and time management.
          </p>

          <AuthButton
            size="lg"
            className="cursor-pointer px-8 py-3 text-lg font-semibold will-change-transform hover:scale-106"
          >
            <Zap className="w-5 h-5 mr-2" />
            Get Started
          </AuthButton>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          <div className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Google Calendar Sync
            </h3>
            <p className="text-gray-600">
              Securely integrate your Google Calendar to fetch the upcoming events.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI-Powered Summaries
            </h3>
            <p className="text-gray-600">
              Automatically generate clear and concise summaries of your events
              using articial intelligence.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Organized Dashboard
            </h3>
            <p className="text-gray-600">
              View all your upcoming events and their summaries in a simple,
              elegant dashboard.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to optimize your calendar?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of users who have transformed their time management
            with CalGist.
          </p>
          <AuthButton
            size="lg"
            className="cursor-pointer px-8 py-3 text-lg font-semibold will-change-transform hover:scale-106"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Start Your Journey
          </AuthButton>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            Made with ❤️ by{" "}
            <Link
              href={"https://github.com/eswar-7116"}
              className="font-bold text-blue-500"
              target="_blank"
            >
              Eswar Dudi
            </Link>
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
