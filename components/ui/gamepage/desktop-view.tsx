import AvailPlatforms from "./available-platforms";
import GenreBlock from "./genre-block";
import ImageBlock from "./image-block";
import ScoreBlock from "./score-block";
import StoryNSummary from "./summary-block";
import YearORe from "./year-of-release";

import { statusTypes } from "@/lib/status-type";

export default function DeskView({
  game,
  userGame,
}: {
  game: any;
  userGame?: any;
}) {
  return (
    <div className="md:flex w-full hidden">
      <div className="w-64 border-r border-neutral-400 mx-4 my-2">
        <ImageBlock cover={game.cover} alt={game.name} />
        <YearORe year={game.year} />
        <div className="text-md font-mono">
          Age Rating:{" "}
          <span className="font-medium font-exo">
            {game.ageRating.join(", ")}
          </span>
        </div>
        {game.franchise.length > 0 ? (
          <div className="text-md font-mono">
            Franchise:{" "}
            <span className="font-medium">{game.franchise.join(", ")}</span>
          </div>
        ) : null}
      </div>
      <div className="max-w-3/4">
        <div className="flex border border-neutral-400 w-fit max-w-9/10 my-2 bg-neutral-200">
          <ScoreBlock rating={game.rating} />
          <GenreBlock genres={game.genres} />
        </div>
        {userGame && (
          <div className="flex border border-neutral-400 w-fit max-w-9/10 my-2 bg-neutral-200 text-xs">
            <div className="mx-4 my-2 bg-neutral-400 py-0.5 px-2 border-neutral-300 border rounded-lg">
              {
                statusTypes.find((stat) => stat.value === userGame.status)
                  ?.label
              }
            </div>
            <div className="mx-4 my-2 bg-neutral-400 py-0.5 px-2 border-neutral-300 border rounded-lg">
              Score: {userGame.score ? userGame.score : "--"}
            </div>
          </div>
        )}

        <StoryNSummary storyline={game.storyline} summary={game.summary} />
        <AvailPlatforms platforms={game.platforms} />
      </div>
    </div>
  );
}
