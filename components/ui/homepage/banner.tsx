"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Banner() {
  const [fade, setFade] = useState(true);
  const [bannerGame, setBannerGame] = useState<any | null>(null);
  const [bannerList, setBannerList] = useState<any[]>([]);

  const chooseBannerGame = async () => {
    const res = await fetch(`/api/category`);
    const data = await res.json();

    setBannerList(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    chooseBannerGame();
  }, []);

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

  if (!bannerGame) return <div>Loading...</div>;

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
        loading="lazy"
      />
      <div className="top-0 bottom-0 left-0 right-0 bg-radial from-transparent to-neutral-900 absolute"></div>
      <h1 className="absolute text-5xl font-semibold bottom-5 left-5 text-neutral-300">
        {bannerGame.name}
      </h1>
    </div>
  );
}
