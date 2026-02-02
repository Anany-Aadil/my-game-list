"use client";

import ListItem from "@/components/list-item";
import StatusBar from "@/components/status-bar";
import InfoBar from "@/components/info-bar";
import SideNav from "@/components/side-nav";
import SearchGames from "@/components/search-games";

import { useState, useEffect } from "react";

export default function Page() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching games: ", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading games...</p>
      </div>
    );
  }

  return (
    <section className="w-250 m-auto h-[50%]">
      <StatusBar />
      <InfoBar />
      <main>
        {games.map((game: any) => (
          <ListItem
            key={game.id}
            name={game.name}
            cover={game.cover}
            platform={game.platforms}
          >
            {null}
          </ListItem>
        ))}
        {/* <ListItem name="Something" cover="/images/nier.png" platform="PC" /> */}
      </main>
      <SideNav onClick={() => setIsSearchOpen(true)} />
      <SearchGames
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </section>
  );
}
