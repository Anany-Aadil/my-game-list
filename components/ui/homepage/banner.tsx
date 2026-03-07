import Image from "next/image";

export default function Banner({
  bannerGame,
  fade,
}: {
  bannerGame: any;
  fade: boolean;
}) {
  return (
    <div
      className={`w-full h-full relative transition-opacity duration-700 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
    >
      <Image
        src={bannerGame.cover}
        alt={bannerGame.name}
        fill
        sizes="90vw"
        className="object-cover"
      />
      <div className="top-0 bottom-0 left-0 right-0 bg-radial from-transparent to-neutral-900 absolute"></div>
      <h1 className="absolute text-5xl font-semibold bottom-5 left-5 text-neutral-300">
        {bannerGame.name}
      </h1>
    </div>
  );
}
