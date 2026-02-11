"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AuthButton from "./log-auth-button";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session } = useSession();
  const userName = session?.user.userName;

  const handleScroll = () => {
    if (window.scrollY > 0) setIsScrolled(true);
    else setIsScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` ${isScrolled ? "bg-neutral-900" : "from-neutral-900/50 bg-linear-to-b to-transparent"} fixed top-0 h-20 w-full flex items-center justify-between transition-colors`}
    >
      <div className="flex items-center">
        <Link
          href={"/home"}
          className="mx-5 px-5 text-4xl font-fascinate text-red-600"
        >
          MyGameList
        </Link>

        {session ? <GameListLink username={userName} /> : null}
      </div>

      <AuthButton />
    </nav>
  );
}

function GameListLink({ username }: { username: string }) {
  return (
    <Link href={`/userlist/${username}`}>
      <div className="text-sm text-neutral-100 py-1 mx-2 px-5 hover:text-neutral-300 transition-colors">
        GameList
      </div>
    </Link>
  );
}
