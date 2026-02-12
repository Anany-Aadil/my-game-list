import Image from "next/image";

export default function Thumbnail({ gameDetail }: { gameDetail: any }) {
  return (
    <div className="h-36 min-w-64 max-w-3xs relative overflow-hidden rounded-sm m-2">
      <div className="peer top-0 bottom-0 left-0 right-0 absolute">
        <Image
          src={gameDetail.background_image}
          alt={gameDetail.name}
          fill
          sizes="64vw"
          title={gameDetail.name}
          className="rounded-lg hover:scale-105 transition-transform smoothing object-cover"
        />
      </div>
      <div className="absolute bottom-3 left-3 text-sm opacity-0 peer-hover:opacity-100 transition-opacity smoothing font-semibold text-shadow-sm">
        {gameDetail.name}
      </div>
    </div>
  );
}
