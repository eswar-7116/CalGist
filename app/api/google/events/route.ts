import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserTokens, fetchGoogleCalendarEvents } from "@/lib/google/actions";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tokens = await getUserTokens(user.id);
  if (!tokens)
    return NextResponse.json(
      { error: "No calendar connection" },
      { status: 403 }
    );

  const events = await fetchGoogleCalendarEvents(tokens);
  return NextResponse.json({ events });
}
