export default function SearchItem({
  game,
  onAdd,
  isAdded,
  idx,
}: {
  game: any;
  onAdd: any;
  isAdded: boolean;
  idx: number;
}) {
  return (
    <div
      className={`flex w-9/10 mx-auto justify-between p-2 border-b border-neutral-700 ${idx % 2 === 0 ? "bg-neutral-800" : ""} `}
    >
      <span className="px-1">{game.name}</span>
      <div className="w-1/5 flex justify-between items-center">
        <span className="text-sm font-asimovian">
          {game.year ? game.year : "TBA"}
        </span>
        <button
          type="button"
          className="hover:bg-indigo-500 bg-indigo-700 transition-colors text-center px-2 rounded-lg text-gray-950"
          onClick={() => onAdd(game)}
          disabled={isAdded}
        >
          <span className="text-sm font-delius">
            {isAdded ? "Added" : "Add"}
          </span>
        </button>
      </div>
    </div>
  );
}
