"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Banner({ bannerList }: { bannerList: any }) {
  const [fade, setFade] = useState(true);
  const [bannerGame, setBannerGame] = useState<any | null>(null);

  useEffect(() => {
    if (!Array.isArray(bannerList) || bannerList.length === 0) return;

    const pickRandom = () => {
      let newGame;

      do {
        newGame = bannerList[Math.floor(Math.random() * bannerList.length)];
      } while (newGame.id === bannerGame?.id);

      setBannerGame(newGame);
    };

    pickRandom();

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        pickRandom();
        setFade(true);
      }, 700);
    }, 10000);

    return () => clearInterval(interval);
  }, [bannerList]);

  if (!bannerGame)
    return (
      <div className="relative w-full h-full overflow-hidden">
        <div className="skeleton-shimmer relative w-full h-full"></div>
      </div>
    );

  return (
    <div
      className={`w-full h-full relative transition-opacity duration-700 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
    >
      <Image
        src={
          bannerGame.artworks[
            Math.floor(Math.random() * bannerGame.artworks.length)
          ]
        }
        alt={bannerGame.name}
        fill
        sizes="64rem"
        className="object-cover"
      />
      <div className="top-0 bottom-0 left-0 right-0 bg-radial from-transparent to-neutral-900 absolute"></div>
      <div className="absolute left-5 top-10 p-5">
        <h1 className="text-5xl font-semibold text-neutral-300 my-5 text-shadow-lg text-shadow-neutral-900">
          {bannerGame.name}
        </h1>
        <p className="text-neutral-200 text-lg text-shadow-md text-shadow-neutral-900 px-2 line-clamp-3">
          {bannerGame.summary}
        </p>
      </div>
      <Link
        href={`/game/${bannerGame.id}`}
        className="bg-neutral-100/80 hover:bg-neutral-200 transition-colors smoothing absolute bottom-1/5 left-12 text-2xl rounded px-3 font-delius py-2"
      >
        Info
        <i className="fa-circle-info fa-solid"></i>
      </Link>
    </div>
  );
}
