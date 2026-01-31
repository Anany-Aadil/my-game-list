export default function SearchItem() {
  return (
    <div className="flex justify-between p-4">
      <div className="">Name of Game</div>
      <button
        type="button"
        className="hover:bg-blue-500 bg-blue-700 transition-colors text-center px-2 rounded-lg text-gray-950"
      >
        Add
      </button>
    </div>
  );
}
