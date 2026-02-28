"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import AuthButton from "./log-auth-button";

export default function Header() {
  const { data: session } = useSession();
  const userName = session?.user.userName;

  return (
    <nav
      className="
      bg-neutral-900 fixed top-0 md:h-20 h-15 w-full flex px-[5%] items-center justify-between transition-colors smoothing
      "
    >
      <div className="flex items-center">
        <Link
          href={"/home"}
          className="md:mx-5 md:px-5 text-4xl font-jolly text-indigo-600 text-shadow-xs"
        >
          <span className="hidden md:inline">MyGameList</span>
          <span className="md:hidden">MGL</span>
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
      <div className="text-sm font-delius text-neutral-100 md:pb-1 pt-1 mx-2 px-5 md:flex-1 hover:text-neutral-300 transition-colors">
        <span className="hidden md:inline">GameList</span>
        <span className="md:hidden">
          <i className="fa-list fa-solid text-2xl"></i>
        </span>
      </div>
    </Link>
  );
}
