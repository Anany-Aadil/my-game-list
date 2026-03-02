import DeskView from "./desktop-view";
import MobView from "./mobile-view";
import SimilarGames from "./similar-games";

export default function GameSpecificPage({ game }: { game: any }) {
  return (
    <section className="bg-neutral-100 mt-15 md:mt-20 w-full font-sans text-neutral-900 md:w-4/5 mx-auto">
      <div className="text-2xl font-semibold p-2 w-full bg-neutral-300">
        {game.name}
      </div>
      <MobView game={game} />
      <DeskView game={game} />
      <SimilarGames similarGames={game.similarGames} />
    </section>
  );
}
