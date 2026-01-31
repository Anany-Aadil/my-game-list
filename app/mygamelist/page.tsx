"use client";

import ListItem from "@/components/list-item";
import StatusBar from "@/components/status-bar";
import InfoBar from "@/components/info-bar";
import SideNav from "@/components/side-nav";
import SearchGames from "@/components/search-games";

import { useState } from "react";

export default function Page() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <section className="w-250 m-auto h-[50%]">
      <StatusBar />
      <InfoBar />
      <main>
        <ListItem />
      </main>
      <SideNav onClick={() => setIsSearchOpen(true)} />
      <SearchGames
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </section>
  );
}
