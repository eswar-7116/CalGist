import { Bot, Calendar, LayoutDashboard } from "lucide-react";

export function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
      {[
        {
          icon: <Calendar className="w-6 h-6 text-blue-600" />,
          bg: "bg-blue-100",
          title: "Google Calendar Sync",
          desc: "Securely integrate your Google Calendar to fetch the upcoming events.",
        },
        {
          icon: <Bot className="w-6 h-6 text-yellow-600" />,
          bg: "bg-yellow-100",
          title: "AI-Powered Summaries",
          desc: "Automatically generate clear and concise summaries of your events using articial intelligence.",
        },
        {
          icon: <LayoutDashboard className="w-6 h-6 text-green-600" />,
          bg: "bg-green-100",
          title: "Organized Dashboard",
          desc: "View all your upcoming events and their summaries in a simple, elegant dashboard.",
        },
      ].map(({ icon, bg, title, desc }, idx) => (
        <div key={idx} className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
          <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{desc}</p>
        </div>
      ))}
    </div>
  );
}
