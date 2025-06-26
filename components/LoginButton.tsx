"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LoginButton() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleGoogleLogin = async () => {
    try {
      const redirectTo =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/auth/callback"
          : `${process.env.PRODUCTION_ORIGIN!}/auth/callback`;

      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      router.push("/auth/error");
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <Button
        disabled
        className="cursor-not-allowed rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
      >
        Loading...
      </Button>
    );
  }

  if (user) {
    // Log out button
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
            Log out
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Log out
            </DialogTitle>
            <p className="text-center text-sm text-muted-foreground">
              Logged in as{" "}
              <span className="font-medium text-foreground">{user.email}</span>
            </p>
            <DialogDescription className="text-center text-muted-foreground">
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="cursor-pointer w-full flex items-center justify-center gap-3 h-12 text-base font-medium transition-colors"
            >
              <LogOut />
              Log out
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="cursor-pointer w-full flex items-center justify-center gap-3 h-12 text-base font-medium transition-colors"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    // Log in button
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
          Log in / Sign up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Log in / Sign up
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Sign in to your account or create a new one
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="cursor-pointer w-full flex items-center justify-center gap-3 h-12 text-base font-medium hover:bg-gray-100 transition-colors"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
