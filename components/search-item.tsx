export default function SearchItem({
  game,
  onAdd,
  isAdded,
}: {
  game: any;
  onAdd: any;
  isAdded: boolean;
}) {
  return (
    <div className="flex justify-between px-4 py-1 my-1">
      <div className="">
        <span className="pr-1">{game.name}</span>
        <span className="pl-1 text-sm">({game.year ? game.year : "TBA"})</span>
      </div>
      <button
        type="button"
        className="hover:bg-blue-500 bg-blue-700 transition-colors text-center px-2 rounded-lg text-gray-950"
        onClick={() => onAdd(game)}
        disabled={isAdded}
      >
        <span className="text-sm">{isAdded ? "Added" : "Add"}</span>
      </button>
    </div>
  );
}
