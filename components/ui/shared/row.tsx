"use client";

import { useRef } from "react";

import Thumbnail from "./thumbnail";
import { RowSkeleton } from "../skeletons";
import Scroller from "./scroller";

export default function Row({
  category,
  title,
  rounded = false,
}: {
  category: Array<any>;
  title: string;
  rounded?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="font-bold mt-4 text-xl font-iceberg">{title}</div>
      <Scroller rowRef={rowRef} customClass="top-[48%] text-4xl">
        <div
          ref={rowRef}
          className="flex overflow-x-scroll max-w-full custom-horizontal-scroll mb-4 gap-4 md:border-r-2 dark:border-neutral-600 relative"
        >
          {category.length !== 0 ? (
            category.map((game) => (
              <Thumbnail game={game} key={game.id} rounded={rounded} />
            ))
          ) : (
            <RowSkeleton />
          )}
        </div>
      </Scroller>
    </>
  );
}
