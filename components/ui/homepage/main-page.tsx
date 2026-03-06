"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [upcomingGames, setUpcomingGames] = useState<any[]>([]);
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUpcoming = async () => {
    setLoading(true);

    const [anticipated, newly, top] = await Promise.all([
      fetch(`/api/category/anticipated`).then((res) => res.json()),
      fetch(`/api/category/recent`).then((res) => res.json()),
      fetch(`/api/category/toprated`).then((res) => res.json()),
    ]);
    setUpcomingGames(Array.isArray(anticipated) ? anticipated : []);
    setRecentGames(Array.isArray(newly) ? newly : []);
    setTopRatedGames(Array.isArray(top) ? top : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  if (loading) return <div className="mt-20">Loading...</div>;

  return (
    <section className="w-4/5 mt-20 mx-auto">
      <div className="flex justify-between">
        <main className="w-3/4 my-2">
          <div className="w-full h-100 border flex"></div>
          <div className="font-bold my-2 mx-1.5 text-xl font-nunito">
            Recent Titles
          </div>
          <div className="flex overflow-x-scroll max-w-full custom-horizontal-scroll">
            {recentGames.map((game) => (
              <Link
                href={`/game/${game.id}`}
                className="min-w-32 m-2 relative border border-neutral-400 overflow-hidden"
                key={game.id}
              >
                <Image
                  src={game.cover}
                  alt={game.name}
                  width={264}
                  height={352}
                  className="w-full hover:scale-105 transition-transform smoothing"
                  unoptimized
                />
                <div className="w-full absolute bottom-0 text-xs text-neutral-100 overflow-hidden shadow-2xs font-medium px-2 py-1 text-nowrap">
                  {game.name.length > 18
                    ? game.name.slice(0, 18) + "..."
                    : game.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="w-full h-100 border flex"></div>
        </main>
        <div>
          <SideList
            gameCategory={upcomingGames}
            title="Most Anticipated Games"
          />
          <SideList gameCategory={topRatedGames} title="Top Rated Games" />
        </div>
      </div>
    </section>
  );
}

function SideList({
  gameCategory,
  title,
}: {
  gameCategory: any;
  title: string;
}) {
  return (
    <div className="w-64 border mt-2 ml-2">
      <div className="border-b px-3 py-1 font-bold">{title}</div>
      {gameCategory.slice(0, 5).map((game: any, idx: number) => (
        <div key={game.id} className="flex w-full my-2">
          <div className="w-8 px-2">{idx + 1}</div>
          <Link
            href={`/game/${game.id}`}
            className="w-20 border border-neutral-400 overflow-hidden"
          >
            <Image
              src={game.cover}
              alt={game.name}
              width={264}
              height={352}
              className="w-full hover:scale-105 transition-transform smoothing"
              unoptimized
            />
          </Link>
          <Link href={`/game/${game.id}`} className="text-neutral-800 p-2 w-36">
            {game.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
