"use client";

import { useState, useEffect } from "react";

import Footer from "../shared/footer";
import DeskView from "./desktop-view";
import MobView from "./mobile-view";
import { GamePageSkeleton } from "../skeletons";
import Row from "../shared/row";
import { notFound } from "next/navigation";

export default function GameSpecificPage({
  gameId,
  gameStats,
}: {
  gameId: number;
  gameStats?: any;
}) {
  const [game, setGame] = useState<any>(null);

  if (gameId == 0) return notFound();

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
    <section className="bg-neutral-100 dark:bg-neutral-800/50 mt-15 md:mt-20 w-full font-sans md:w-4/5 mx-auto transition-colors smoothing">
      <div className="text-2xl font-semibold p-2 w-full bg-neutral-300 dark:bg-neutral-800">
        {game.name}
      </div>
      <MobView game={game} />
      <DeskView game={game} userGame={gameStats} />
      <div className="mx-4 md:border-t md:my-5 border-neutral-400 relative">
        <Row title="Similar Games" category={game.similarGames} rounded />
      </div>
      <Footer />
    </section>
  );
}
