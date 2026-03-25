import Image from "next/image";
import Link from "next/link";
import { SideListSkeleton } from "../skeletons";

export default function SideList({
  gameCategory,
  title,
}: {
  gameCategory: Array<any>;
  title: string;
}) {
  return (
    <div className="w-64 border border-neutral-500 dark:border-neutral-600 mt-2 ml-2 bg-neutral-50 dark:bg-neutral-800 relative overflow-hidden">
      <div className="border-b border-neutral-500 dark:border-neutral-600 px-3 py-1 font-bold font-iceberg">
        {title}
      </div>
      {gameCategory.length !== 0 ? (
        gameCategory.slice(0, 5).map((game: any, idx: number) => (
          <div key={game.id} className="flex w-full my-2">
            <div className="w-8 px-2 font-asimovian">{idx + 1}.</div>
            <Link
              href={`/game/${game.id}`}
              className="w-20 border border-neutral-400 dark:border-neutral-700 overflow-hidden"
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
            <Link
              href={`/game/${game.id}`}
              className="p-2 w-36 hover:underline"
            >
              {game.name}
            </Link>
          </div>
        ))
      ) : (
        <SideListSkeleton />
      )}
    </div>
  );
}
