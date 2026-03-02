import Image from "next/image";
import Link from "next/link";

export default function SimilarGames({ similarGames }: { similarGames: any }) {
  return (
    <div className="mx-4 md:border-t md:my-5 border-neutral-400">
      <div className="text-lg w-full font-medium md:pt-3 pt-1">
        Similar Games:
      </div>
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
