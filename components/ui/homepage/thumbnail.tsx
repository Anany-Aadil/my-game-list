import Image from "next/image";
import Link from "next/link";

export default function Thumbnail({ gameDetail }: { gameDetail: any }) {
  return (
    <Link
      className="h-36 min-w-64 relative overflow-hidden rounded-sm m-2"
      href={`/game/${gameDetail.slug}`}
    >
      <div className="peer top-0 bottom-0 left-0 right-0 absolute">
        <Image
          src={gameDetail.background_image}
          alt={gameDetail.name}
          fill
          sizes="16rem"
          title={gameDetail.name}
          className="rounded-lg hover:scale-105 transition-transform smoothing object-cover"
        />
      </div>
      <div className="absolute bottom-3 left-3 text-sm opacity-0 peer-hover:opacity-100 transition-opacity smoothing font-semibold text-shadow-sm">
        {gameDetail.name}
      </div>
    </Link>
  );
}
