"use client";

import { useState, useEffect } from "react";

import Footer from "../homepage/footer";
import DeskView from "./desktop-view";
import MobView from "./mobile-view";
import SimilarGames from "./similar-games";

export default function GameSpecificPage({ gameId }: { gameId: number }) {
  const [game, setGame] = useState<any>(null);

  const fetchGame = async () => {
    const gameObject = await fetch(`/api/game/?gameId=${gameId}`);
    const game = await gameObject.json();
    setGame(game);
  };

  useEffect(() => {
    fetchGame();
  }, []);

  if (!game) return <div>Loading...</div>;
  return (
    <section className="bg-neutral-100 mt-15 md:mt-20 w-full font-sans text-neutral-900 md:w-4/5 mx-auto">
      <div className="text-2xl font-semibold p-2 w-full bg-neutral-300">
        {game.name}
      </div>
      <MobView game={game} />
      <DeskView game={game} />
      <SimilarGames similarGames={game.similarGames} />
      <Footer />
    </section>
  );
}
