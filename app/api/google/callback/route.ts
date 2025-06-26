import createOAuth2Client from "@/lib/google/client";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return redirect("/auth/error");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/auth/error");

  const oauth2Client = createOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const { access_token, refresh_token, expiry_date } = tokens;

  const { error } = await supabase.from("google_tokens").upsert({
    user_id: user.id,
    access_token,
    refresh_token,
    expiry_date,
  });

  if (error) {
    console.error("Failed to store Google tokens:", error.message);
    return redirect("/auth/error");
  }

  return redirect("/dashboard");
}
