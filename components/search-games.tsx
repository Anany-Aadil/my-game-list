// import SearchIcon from "/search.svg";
import Image from "next/image";
import SearchItem from "./search-item";

export default function SearchGames({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
  if (!isOpen) return null; // Don't render ig?

  return (
    <div className="bg-gray-800 fixed w-[50%] h-100 rounded-xl text-gray-200 left-1/4">
      <search className="border-2 border-gray-200 w-[75%] h-15 items-center justify-between flex rounded-4xl mx-auto my-5">
        <input
          type="text"
          name="gamename"
          id="gamename"
          className="h-full w-[85%] mx-2.5 border-none outline-none px-3 py-0.5"
          placeholder="Search for Video Games"
        />
        <button
          className="w-10 h-10 rounded-4xl bg-blue-200 border border-blue-800 mx-2.5"
          type="button"
        >
          <Image
            src="/search.svg"
            alt="search icon"
            width={20}
            height={20}
            className="mx-auto"
          />
        </button>
      </search>
      <SearchItem />
      <button
        type="button"
        className="absolute text-center right-1 bottom-1 rounded-xl border w-5 h-5 text-sm hover:bg-red-400 transition-colors"
        onClick={onClose}
      >
        X
      </button>
    </div>
  );
}
