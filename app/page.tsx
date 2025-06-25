import LoginButton from "@/components/layout/LoginButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 gap-4 justify-center h-full items-center">
      <h1>
        Welcome to <b>CalGist</b>!
      </h1>
      <LoginButton />
    </main>
  );
}
