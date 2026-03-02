"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import GameSpecificPage from "@/components/ui/gamepage/game-page";

export default function GamePage() {
  const [game, setGame] = useState<any>(null);

  const params = useParams();
  const gameId = params.gamepage;

  const fetchGame = async () => {
    const gameObject = await fetch(`/api/games/game?gameId=${gameId}`);
    const game = await gameObject.json();
    setGame(game);
  };

  useEffect(() => {
    fetchGame();
  }, []);

  if (!game) return <div>Loading...</div>;

  return <GameSpecificPage game={game} />;
}
