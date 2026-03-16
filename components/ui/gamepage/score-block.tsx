export default function ScoreBlock({ rating }: { rating: number }) {
  return (
    <div className="md:border-r border-neutral-400 dark:border-neutral-600 flex md:flex-col md:px-4 md:my-4 md:items-center">
      <div className="bg-indigo-500 hidden md:block w-fit px-2 pt-0.5 rounded-xs text-xs font-exo">
        SCORE
      </div>
      <span className="md:hidden">
        <i className="fa-star fa-regular"></i>
      </span>
      <span className="font-exo md:text-2xl text-lg md:font-semibold text-nowrap">
        {rating ? Math.round(rating * 10) / 100 : "No User Rating Available"}
      </span>
    </div>
  );
}
