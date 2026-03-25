"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import DarkModeButton from "./dark-button";
import AuthButton from "./log-auth-button";
import SearchBox from "./search-box";

export default function Header() {
  const { data: session } = useSession();
  const userName = session?.user.userName;

  const pathname = usePathname();

  const hideCondition = pathname.slice(1, 9) === "gamelist";

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav
      className={`dark:bg-neutral-950 bg-neutral-900 fixed top-0 md:h-20 h-15 w-full md:w-4/5 md:mx-[10%] flex px-[5%] items-center justify-between transition-colors smoothing z-10 ${hideCondition && "md:hidden"} text-neutral-200`}
    >
      <div className="flex items-center">
        <Link
          href={"/home"}
          className="md:mr-5 md:pr-5 text-4xl font-jolly text-indigo-600 text-shadow-xs"
        >
          <span className="hidden md:inline">MyGameList</span>
          <span className="md:hidden">MGL</span>
        </Link>

        {session ? <GameListLink username={userName} /> : null}
      </div>
      <button className="mx-2">
        <DarkModeButton />
      </button>
      <button
        className={`${hideCondition && "hidden"} flex items-center mt-1 md:mt-0 cursor-pointer hover:text-neutral-100 hover:scale-105 transition-all smoothing mx-2`}
        onClick={() => setIsSearchOpen(true)}
      >
        <i className="fa-search fa-solid"></i>
      </button>
      <SearchBox isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthButton />
    </nav>
  );
}

function GameListLink({ username }: { username: string }) {
  return (
    <Link href={`/gamelist/${username}`}>
      <div className="text-sm font-delius text-neutral-100 md:pb-1 pt-1 mx-2 px-5 md:flex-1 hover:text-neutral-300 transition-colors">
        <span className="hidden md:inline">GameList</span>
        <span className="md:hidden">
          <i className="fa-list fa-solid text-2xl"></i>
        </span>
      </div>
    </Link>
  );
}
