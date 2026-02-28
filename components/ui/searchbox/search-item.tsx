export default function SearchItem({
  game,
  onAdd,
  isAdded,
  idx,
  isEditing,
}: {
  game: any;
  onAdd: any;
  isAdded: boolean;
  idx: number;
  isEditing: boolean;
}) {
  return (
    <div
      className={`flex w-9/10 mx-auto justify-between p-2 border-b border-neutral-700 ${idx % 2 === 0 ? "bg-neutral-800" : ""} `}
    >
      <span className="px-1 overflow-x-hidden text-nowrap max-w-2/3">
        {game.name}
      </span>
      <div className="md:w-1/5 flex justify-between items-center w-3/10">
        <span className="text-sm font-asimovian">
          {game.year ? game.year : "TBA"}
        </span>
        <button
          type="button"
          className={` transition-colors text-center md:px-2 px-1.5 md:rounded-lg rounded-md text-gray-950 ${isAdded ? "bg-neutral-400" : "hover:bg-indigo-500 bg-indigo-700 cursor-pointer"}`}
          onClick={() => onAdd(game)}
          disabled={isAdded || isEditing}
        >
          <span className="md:text-sm text-xs font-delius">
            {isAdded ? "Added" : "Add"}
          </span>
        </button>
      </div>
    </div>
  );
}
