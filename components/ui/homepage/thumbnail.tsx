import Image from "next/image";
import Link from "next/link";

export default function Thumbnail({ game }: { game: any }) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="min-w-32 my-2 relative border border-neutral-400 overflow-hidden"
    >
      <Image
        src={game.cover}
        alt={game.name}
        width={264}
        height={352}
        className="w-full hover:scale-105 transition-transform smoothing"
        unoptimized
      />
      <div className="w-full absolute bottom-0 text-xs text-neutral-100 overflow-hidden text-shadow-md text-shadow-neutral-900 font-medium px-2 py-1 text-nowrap">
        {game.name.length > 18 ? game.name.slice(0, 18) + "..." : game.name}
      </div>
    </Link>
  );
}
