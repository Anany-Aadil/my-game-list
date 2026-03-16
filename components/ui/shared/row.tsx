"use client";

import { useRef, useState } from "react";

import Thumbnail from "./thumbnail";

export default function Row({
  category,
  title,
  rounded = false,
}: {
  category: any[];
  title: string;
  rounded?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const [isMoved, setIsMoved] = useState(false);

  const handleScroll = (dir: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollToBit =
        dir == "left"
          ? scrollLeft - Math.round(clientWidth / 1.5)
          : scrollLeft + Math.round(clientWidth / 1.5);

      rowRef.current.scrollTo({ left: scrollToBit, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="font-bold mt-4 text-xl font-iceberg">{title}</div>
      <button
        className={`absolute hidden -left-3 top-[48%] z-1 ${isMoved && "md:block"}`}
        onClick={() => handleScroll("left")}
      >
        <i className="fa-angle-left fa-solid chev-ico smoothing"></i>
      </button>
      <div
        ref={rowRef}
        className="flex overflow-x-scroll max-w-full custom-horizontal-scroll mb-4 gap-4 md:border-r-2"
      >
        {category.map((game) => (
          <Thumbnail game={game} key={game.id} rounded={rounded} />
        ))}
      </div>
      <button
        className="absolute hidden md:block -right-3 top-[48%] z-1"
        onClick={() => handleScroll("right")}
      >
        <i className="fa-angle-right fa-solid chev-ico smoothing"></i>
      </button>
    </>
  );
}
