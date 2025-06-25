"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GoogleIcon from "../icons/GoogleIcon";

export default function LoginButton() {
  const [open, setOpen] = useState(false);

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    setOpen(false);
  };

  return (
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