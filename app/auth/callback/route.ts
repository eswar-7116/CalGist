import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = process.env.NEXT_PUBLIC_SITE_URL!;

  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (sessionError) {
      console.error("Error exchanging code for session:", sessionError.message);
      return NextResponse.redirect(`${origin}/auth/error`);
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user after session:", userError.message);
      return NextResponse.redirect(`${origin}/auth/error`);
    }

    if (user) {
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking existing user:", fetchError.message);
        return NextResponse.redirect(`${origin}/auth/error`);
      }

      if (!existingUser) {
        const { error: insertError } = await supabase.from("users").insert({
          id: user.id,
          email: user.email,
        });

        if (insertError) {
          console.error("Error inserting new user:", insertError.message);
          return NextResponse.redirect(`${origin}/auth/error`);
        } else {
          console.log("New user inserted into database:", user.email);
        }
      }
    }

    return NextResponse.redirect(`${origin}${next}`);
  }

  console.error("OAuth flow failed or no code present in URL");
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
