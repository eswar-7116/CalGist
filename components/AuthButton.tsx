"use client";

import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AuthButton({ children, ...props }: ComponentProps<typeof Button>) {
  const handleClick = () => {
    toast.error("Please log in or sign up first to access your dashboard!");
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
