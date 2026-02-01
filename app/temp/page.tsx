"use client";

import { useEffect, useState } from "react";

export default function Page() {
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
    <div>
      <h1>Games</h1>

      {games.map((game) => (
        <li key={game.id}>
          <strong>{game.name}</strong>
          <img src={game.cover} alt="game cover" />
        </li>
      ))}
    </div>
  );
}
