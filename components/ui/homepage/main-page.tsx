"use client";

import { useState, useEffect } from "react";
import Banner from "./banner";
import Row from "./row";

export default function MainPage() {
  const [trending, setTrending] = useState<any[]>([]);
  const [action, setAction] = useState<any[]>([]);
  const [indie, setIndie] = useState<any[]>([]);
  const [multiplayer, setMultiplayer] = useState<any[]>([]);
  const [rpg, setRpg] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState<any>(null);

  const fetchAllTypes = async () => {
    setLoading(true);
    const [
      topRatedGames,
      actionGames,
      indieGames,
      multiplayerGames,
      rolePlayGames,
    ] = await Promise.all([
      fetch(`/api/homepage?filter=metacritic=90,100`).then((res) => res.json()),
      fetch(`/api/homepage?filter=tags=16`).then((res) => res.json()),
      fetch(`/api/homepage?filter=genres=51`).then((res) => res.json()),
      fetch(`/api/homepage?filter=tags=7`).then((res) => res.json()),
      fetch(`/api/homepage?filter=tags=233`).then((res) => res.json()),
    ]);
    setTrending(Array.isArray(topRatedGames) ? topRatedGames : []);
    setAction(Array.isArray(actionGames) ? actionGames : []);
    setIndie(Array.isArray(indieGames) ? indieGames : []);
    setMultiplayer(Array.isArray(multiplayerGames) ? multiplayerGames : []);
    setRpg(Array.isArray(rolePlayGames) ? rolePlayGames : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTypes();
  }, []);

  useEffect(() => {
    let randomGame = Math.floor(Math.random() * trending.length);
    setCurrentGame(trending[randomGame]);
  }, [trending]);

  return (
    <section className="w-full bg-neutral-900">
      <main>
        {loading ? (
          <>
            <div>Loading...</div>
          </>
        ) : (
          <>
            <Banner currentGame={currentGame} />
          </>
        )}
      </main>
      <div className="bg-linear-to-t from-neutral-900 via-neutral-900 to-transparent h-[30vh] w-full absolute -bottom-18.75"></div>
      <Row category={trending} title="Top Rated" />
      <Row category={action} title="Horror Games" />
      <Row category={indie} title="Indie Games" />
      <Row category={multiplayer} title="Multiplayer Games" />
      <Row category={rpg} title="Role-Playing Games" />
    </section>
  );
}
