"use client";

import { useState, useEffect } from "react";

import Footer from "../homepage/footer";
import DeskView from "./desktop-view";
import MobView from "./mobile-view";
import { GamePageSkeleton } from "../skeletons";
import Row from "../homepage/row";

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

  if (!game) return <GamePageSkeleton />;
  return (
    <section className="bg-neutral-100 mt-15 md:mt-20 w-full font-sans text-neutral-900 md:w-4/5 mx-auto">
      <div className="text-2xl font-semibold p-2 w-full bg-neutral-300">
        {game.name}
      </div>
      <MobView game={game} />
      <DeskView game={game} />
      {/* <SimilarGames similarGames={game.similarGames} /> */}
      <div className="mx-4 md:border-t md:my-5 border-neutral-400 relative">
        <Row title="Similar Games" category={game.similarGames} rounded />
      </div>
      <Footer />
    </section>
  );
}
