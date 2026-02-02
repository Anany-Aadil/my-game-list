export default function SearchItem({
  game,
  onAdd,
  isAdded,
}: {
  game: any;
  onAdd: any;
  isAdded: boolean;
}) {
  const handleAdd = () => {
    console.log("Added game: ", game.name);
  };

  return (
    <div className="flex justify-between px-4 py-1 my-1">
      <span className="">{game.name}</span>
      <button
        type="button"
        className="hover:bg-blue-500 bg-blue-700 transition-colors text-center px-2 rounded-lg text-gray-950"
        onClick={() => onAdd(game)}
        disabled={isAdded}
      >
        <span className="text-sm">{isAdded ? "Edit" : "Add"}</span>
      </button>
    </div>
  );
}
