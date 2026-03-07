import Image from "next/image";
import Link from "next/link";

export default function SimilarGames({ similarGames }: { similarGames: any }) {
  return (
    <div className="mx-4 md:border-t md:my-5 border-neutral-400">
      <div className="text-xl font-iceberg w-full font-semibold md:pt-3 pt-1">
        Similar Games:
      </div>
      <div className="overflow-x-scroll flex space-x-2 custom-horizontal-scroll">
        {similarGames.map((s_game: any) => (
          <Link className="" key={s_game.id} href={`/game/${s_game.id}`}>
            <div className="w-32 aspect-3/4 rounded overflow-hidden relative">
              <Image
                src={s_game.cover}
                alt={s_game.name}
                width={264}
                height={352}
                unoptimized
                className="w-full h-full rounded hover:scale-105 transition-transform smoothing"
              />
              <span className="left-0 bottom-0 text-xs p-1 text-neutral-200 absolute font-medium text-shadow-md text-shadow-neutral-700">
                {s_game.name.length > 18
                  ? s_game.name.slice(0, 18) + "..."
                  : s_game.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
