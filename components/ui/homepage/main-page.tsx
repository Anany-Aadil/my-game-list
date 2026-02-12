"use client";

import { useState, useEffect } from "react";
import Banner from "./banner";
import Row from "./row";

import { BannerSkeleton, RowSkeleton } from "../skeletons";

export default function MainPage() {
  const [topRated, setTopRated] = useState<any[]>([]);
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
    setTopRated(Array.isArray(topRatedGames) ? topRatedGames : []);
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
    let randomGame = Math.floor(Math.random() * topRated.length);
    setCurrentGame(topRated[randomGame]);
  }, [topRated]);

  return (
    <section className="w-full bg-neutral-900">
      {loading ? (
        <>
          <BannerSkeleton />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <div className="w-40 h-15 pl-2 bg-neutral-100 blur"></div>
              <RowSkeleton />
            </div>
          ))}
        </>
      ) : (
        <>
          <Banner currentGame={currentGame} />
          <div className="bg-linear-to-t from-neutral-900 via-neutral-900 to-transparent h-[30vh] w-full absolute -bottom-18.75" />
          <Row category={topRated} title="Top Rated" />
          <Row category={action} title="Horror Games" />
          <Row category={indie} title="Indie Games" />
          <Row category={multiplayer} title="Multiplayer Games" />
          <Row category={rpg} title="Role-Playing Games" />
        </>
      )}
    </section>
  );
}
