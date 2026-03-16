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
        <div className="flex border border-neutral-400 dark:border-neutral-700 w-fit max-w-9/10 my-2 bg-neutral-200 dark:bg-neutral-800">
          <ScoreBlock rating={game.rating} />
          <GenreBlock genres={game.genres} />
        </div>
        {userGame && (
          <div className="flex border border-neutral-400 dark:border-neutral-600 w-fit max-w-9/10 my-2 bg-neutral-200 dark:bg-neutral-800 text-xs">
            <UserStat>
              {
                statusTypes.find((stat) => stat.value === userGame.status)
                  ?.label
              }
            </UserStat>
            <UserStat>Score: {userGame.score ? userGame.score : "--"}</UserStat>
          </div>
        )}

        <StoryNSummary storyline={game.storyline} summary={game.summary} />
        <AvailPlatforms platforms={game.platforms} />
      </div>
    </div>
  );
}

function UserStat({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-4 my-2 bg-neutral-400 dark:bg-neutral-700 py-0.5 px-2 border-neutral-300 dark:border-neutral-600 border rounded-lg">
      {children}
    </div>
  );
}
