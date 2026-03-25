"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SearchItem({
  game,
  onAdd,
  isAdded,
  idx,
  isEditing,
}: {
  game: any;
  onAdd: any;
  isAdded: boolean;
  idx: number;
  isEditing: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`flex flex-col md:flex-row items-center w-full md:w-9/10 md:mx-auto justify-between md:p-2 border-b border-neutral-700 relative ${idx % 2 === 0 ? "bg-neutral-900" : ""} `}
    >
      <InfoBox game={game} hovered={hovered} setHovered={setHovered} />
      <span
        className="px-1 overflow-x-hidden text-nowrap max-w-2/3 h-full hidden md:inline"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {game.name}
      </span>
      <div className="md:w-1/5 flex justify-between items-center w-9/10 md:pb-0 pb-2">
        <span className="text-sm font-asimovian">
          {game.year ? game.year : "TBA"}
        </span>
        <button
          type="button"
          className={` transition-colors text-center md:px-2 px-1.5 md:rounded-lg rounded-md text-gray-950 ${isAdded ? "bg-neutral-400" : "hover:bg-indigo-500 bg-indigo-700 cursor-pointer"}`}
          onClick={() => onAdd(game)}
          disabled={isAdded || isEditing || game.id === 0}
        >
          <span className="md:text-sm text-xs font-delius">
            {isAdded ? "Added" : "Add"}
          </span>
        </button>
      </div>
    </div>
  );
}

function InfoBox({
  game,
  hovered,
  setHovered,
}: {
  game: any;
  hovered: boolean;
  setHovered: CallableFunction;
}) {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`md:absolute border-t border-neutral-700 transition-transform smoothing text-neutral-800 dark:text-neutral-200 md:bg-neutral-200 rounded-tr-md rounded-bl-md md:dark:bg-neutral-700 top-full z-10 left-0 md:flex ${hovered ? "md:scale-y-100" : "md:scale-y-0"}`}
    >
      <Image
        className="md:w-20 rounded-bl-md"
        src={
          game.cover
            ? game.cover
            : "https://unsplash-assets.imgix.net/empty-states/photos.png"
        }
        alt={game.name}
        width={264}
        height={352}
      />
      <div className="p-2">
        <Link href={`/game/${game.id}`} target="_blank" className="w-fit">
          {game.name}
        </Link>
        <div className="max-w-40 text-xs md:block hidden">
          {game.platforms.join(", ")}
        </div>
      </div>
    </div>
  );
}
