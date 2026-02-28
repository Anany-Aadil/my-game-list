"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function GamePage() {
  const [game, setGame] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const params = useParams();
  const gameId = params.gamepage;

  const fetchGame = async () => {
    const gameObject = await fetch(`/api/games/game?slug=${gameId}`);
    const game = await gameObject.json();
    setGame(game);
  };

  useEffect(() => {
    fetchGame();
  }, []);

  if (!game) return <div>Loading...</div>;

  return (
    <section className="bg-neutral-100 mt-15 md:mt-20 w-full font-sans text-neutral-900">
      <div className="text-2xl font-semibold p-2 w-full bg-neutral-300">
        {game.name}
      </div>
      <div className="grid grid-cols-2">
        <Image
          src={game.cover}
          alt={game.name}
          width={264}
          height={352}
          unoptimized
        />
        <div className="p-2 flex flex-col justify-around">
          <div className="font-medium text-md">
            Year of Release:{" "}
            <span className="font-asimovian text-lg">
              {game.year ? game.year : "TBA"}
            </span>
          </div>
          <div className="font-exo text-lg">
            <i className="fa-star fa-regular"></i>
            {game.rating
              ? Math.round(game.rating * 10) / 100
              : "No User Rating Available"}
          </div>
          <div className="text-sm">
            <span className="font-medium">Developed and Published By:</span>
            <br />
            <span className="text-md font-mono">
              {game.companies.join(", ")}
            </span>
          </div>
        </div>
      </div>
      <div className="border-b border-t border-neutral-600 p-2 text-lg flex items-center">
        {game.genres.map((gn: string) => (
          <div
            key={gn}
            className="border mx-2 px-1 rounded-sm text-sm overflow-x-hidden text-gray-700"
          >
            {gn}
          </div>
        ))}
      </div>

      <main
        className={`px-4 text-justify transition-all smoothing overflow-y-hidden ${isExpanded ? "max-h-25" : "max-h-screen"}`}
      >
        <div className="py-2">
          <span className="font-medium text-lg">Summary: </span>
          <p>{game.summary}</p>
        </div>
        <div className="py-2">
          <span className="font-medium text-lg">Storyline:</span>
          <p>{game.storyline}</p>
        </div>
      </main>
      <button
        className="w-full text-end py-2 relative"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-full absolute -top-5 h-5 bg-linear-to-t from-neutral-100 to-transparent"></div>
        {isExpanded ? (
          <>
            Read More <i className="fa-angle-down fa-solid"></i>
          </>
        ) : (
          <>
            Close <i className="fa-angle-up fa-solid"></i>
          </>
        )}
      </button>
      <div className="">
        <div className="border-b border-t border-neutral-600 p-2 text-lg">
          <div className="px-2">Available Platforms :</div>
          <div className="overflow-x-scroll flex">
            {game.platforms.map((pf: string) => (
              <div
                key={pf}
                className="border border-emerald-800 mx-2 px-1 rounded-sm text-sm text-nowrap text-emerald-800"
              >
                {pf}
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 text-lg w-full">Similar Games:</div>
        <div className="overflow-x-scroll flex space-x-2 px-4">
          {game.similarGames.map((s_game: any) => (
            <Link
              className="bg-neutral-800 rounded"
              key={s_game.id}
              href={`/game/${s_game.id}`}
            >
              <Image
                src={s_game.cover}
                alt={s_game.name}
                width={264}
                height={352}
                unoptimized
                className="min-w-32 aspect-3/4 object-cover rounded"
              />
              <div className="left-0 bottom-0 text-xs p-1 text-neutral-200">
                {s_game.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
