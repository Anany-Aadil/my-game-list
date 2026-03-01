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
    <section className="bg-neutral-100 mt-15 md:mt-20 w-full font-sans text-neutral-900 md:w-4/5 mx-auto">
      <div className="text-2xl font-semibold p-2 w-full bg-neutral-300">
        {game.name}
      </div>
      <MobView
        game={game}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <DeskView game={game} />
      <SimilarGames similarGames={game.similarGames} />
    </section>
  );
}

function ScoreBlock({ rating }: { rating: number }) {
  return (
    <div className="md:border-r flex md:flex-col md:px-4 md:my-4 md:items-center">
      <div className="bg-indigo-500 hidden md:block w-fit px-2 pt-0.5 rounded-xs text-xs font-exo">
        SCORE
      </div>
      <span className="md:hidden">
        <i className="fa-star fa-regular"></i>
      </span>
      <span className="font-exo md:text-2xl text-lg md:font-semibold">
        {rating ? Math.round(rating * 10) / 100 : "No User Rating Available"}
      </span>
    </div>
  );
}

function CompanyBlock({ companies }: { companies: Array<string> }) {
  return (
    <div className="text-sm">
      <span className="font-medium">Developed and Published By:</span>
      <br />
      <span className="text-md font-mono">{companies.join(", ")}</span>
    </div>
  );
}

function YearORe({ year }: { year: number }) {
  return (
    <div className="text-md font-medium md:font-normal">
      Year of Release:{" "}
      <span className="font-asimovian text-lg md:text-md">
        {year ? year : "TBA"}
      </span>
    </div>
  );
}

function GridCol2({
  year,
  rating,
  companies,
}: {
  year: number;
  rating: number;
  companies: Array<string>;
}) {
  return (
    <div className="p-2 flex flex-col justify-around">
      <YearORe year={year} />
      <ScoreBlock rating={rating} />
      <CompanyBlock companies={companies} />
    </div>
  );
}

function GenreBlock({ genres }: { genres: Array<string> }) {
  return (
    <div className="border-b border-t md:border-0 border-neutral-600 p-2 text-lg flex items-center">
      {genres.map((gn: string) => (
        <div
          key={gn}
          className="border mx-2 px-1 rounded-sm text-sm text-gray-700 font-nunito"
        >
          {gn}
        </div>
      ))}
    </div>
  );
}

function SimilarGames({ similarGames }: { similarGames: any }) {
  return (
    <div className="mx-4 md:border-t md:my-5">
      <div className="text-lg w-full font-medium">Similar Games:</div>
      <div className="overflow-x-scroll flex space-x-2 custom-horizontal-scroll">
        {similarGames.map((s_game: any) => (
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
  );
}

function AvailPlatforms({ platforms }: { platforms: Array<string> }) {
  return (
    <div className="border-b border-t md:border-b-0 md:mt-5 md:w-9/10 border-neutral-600 p-2 text-lg">
      <div className="px-2">Available Platforms :</div>
      <div className="overflow-x-scroll custom-horizontal-scroll flex">
        {platforms.map((pf: string) => (
          <div
            key={pf}
            className="border border-emerald-800 mx-2 px-1 rounded-sm text-sm text-nowrap text-emerald-800 font-nunito"
          >
            {pf}
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryNSummary({
  storyline,
  summary,
}: {
  storyline: string;
  summary: string;
}) {
  return (
    <div className="py-2 md:max-w-9/10">
      <span className="font-medium md:font-semibold text-lg md:text-sm">
        Summary:{" "}
      </span>
      <p className="md:text-sm pb-2">
        {summary ? summary : "No Summary Available"}
      </p>
      {storyline ? (
        <>
          <span className="font-medium md:font-semibold text-lg md:text-sm pt-2">
            Storyline:
          </span>
          <p className="md:text-sm">{storyline}</p>
        </>
      ) : null}
    </div>
  );
}

function ImageBlock({ cover, alt }: { cover: string; alt: string }) {
  return (
    <div className="md:mr-2">
      <Image src={cover} alt={alt} width={264} height={352} unoptimized />
    </div>
  );
}

function MobView({
  game,
  isExpanded,
  setIsExpanded,
}: {
  game: any;
  isExpanded: boolean;
  setIsExpanded: React.SetStateAction<any>;
}) {
  return (
    <div className="md:hidden">
      <div className="grid grid-cols-2">
        <ImageBlock alt={game.name} cover={game.cover} />
        <GridCol2
          companies={game.companies}
          year={game.year}
          rating={game.rating}
        />
      </div>
      <GenreBlock genres={game.genres} />
      <main
        className={`px-4 text-justify transition-all smoothing overflow-y-hidden ${
          isExpanded ? "max-h-screen" : "max-h-25"
        } md:max-h-fit`}
      >
        <StoryNSummary storyline={game.storyline} summary={game.summary} />
      </main>
      <button
        className="w-full text-end py-2 relative md:hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-full absolute -top-5 h-5 bg-linear-to-t from-neutral-100 to-transparent"></div>
        {isExpanded ? (
          <>
            Close <i className="fa-angle-up fa-solid"></i>
          </>
        ) : (
          <>
            Read More <i className="fa-angle-down fa-solid"></i>
          </>
        )}
      </button>
      <AvailPlatforms platforms={game.platforms} />
    </div>
  );
}

function DeskView({ game }: { game: any }) {
  return (
    <div className="md:flex w-full hidden">
      <div className="min-w-64 border-r mx-4 my-2">
        <ImageBlock cover={game.cover} alt={game.name} />
        <YearORe year={game.year} />
        <div className="text-md">
          Age Rating:{" "}
          <span className="font-medium font-exo">
            {game.ageRating.join(", ")}
          </span>
        </div>
        {game.franchise.length > 0 ? (
          <div className="text-md">
            Franchise:{" "}
            <span className="font-medium">{game.franchise.join(", ")}</span>
          </div>
        ) : null}
      </div>
      <div className="">
        <div className="flex border w-fit max-w-9/10 my-2">
          <ScoreBlock rating={game.rating} />
          <GenreBlock genres={game.genres} />
        </div>
        <StoryNSummary storyline={game.storyline} summary={game.summary} />
        <AvailPlatforms platforms={game.platforms} />
      </div>
    </div>
  );
}
