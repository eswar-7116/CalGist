import Link from "next/link";
import LoginButton from "./LoginButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b text-xl text-black">
      <Link href="/">
        <b>CalGist</b>
      </Link>
      <LoginButton />
    </header>
  );
}
