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
        <span className="pl-1 text-sm">({game.year ? game.year : "TBA"})</span>
        <button
          type="button"
          className="hover:bg-blue-500 bg-blue-700 transition-colors text-center px-2 rounded-lg text-gray-950"
          onClick={() => onAdd(game)}
          disabled={isAdded}
        >
          <span className="text-sm">{isAdded ? "Added" : "Add"}</span>
        </button>
      </div>
    </div>
  );
}
