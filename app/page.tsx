import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Hero } from "@/components/layout/Hero";
import { Features } from "@/components/layout/Features";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <Hero />
        <Features />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
