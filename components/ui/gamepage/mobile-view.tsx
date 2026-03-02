"use client";

import { useState } from "react";
import AvailPlatforms from "./available-platforms";
import CompanyBlock from "./companies-block";
import GenreBlock from "./genre-block";
import ImageBlock from "./image-block";
import ScoreBlock from "./score-block";
import StoryNSummary from "./summary-block";
import YearORe from "./year-of-release";

export default function MobView({ game }: { game: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="md:hidden">
      <div className="grid grid-cols-2">
        <ImageBlock alt={game.name} cover={game.cover} />
        <GridCol2
          companies={game.companies}
          year={game.year}
          rating={game.rating}
        />
      </div>
      <GenreBlock genres={game.genres} />
      <main
        className={`px-4 text-justify transition-all smoothing overflow-y-hidden ${
          isExpanded ? "max-h-screen" : "max-h-25"
        } md:max-h-fit`}
      >
        <StoryNSummary storyline={game.storyline} summary={game.summary} />
      </main>
      <button
        className="w-full text-end py-2 relative md:hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-full absolute -top-5 h-5 bg-linear-to-t from-neutral-100 to-transparent"></div>
        {isExpanded ? (
          <>
            Close <i className="fa-angle-up fa-solid"></i>
          </>
        ) : (
          <>
            Read More <i className="fa-angle-down fa-solid"></i>
          </>
        )}
      </button>
      <AvailPlatforms platforms={game.platforms} />
    </div>
  );
}

function GridCol2({
  year,
  rating,
  companies,
}: {
  year: number;
  rating: number;
  companies: Array<string>;
}) {
  return (
    <div className="p-2 flex flex-col justify-around">
      <YearORe year={year} />
      <ScoreBlock rating={rating} />
      <CompanyBlock companies={companies} />
    </div>
  );
}
