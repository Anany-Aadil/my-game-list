"use client";

import { useState } from "react";

// import SearchIcon from "/search.svg";
import Image from "next/image";
import SearchItem from "@/components/search-item";

export default function SearchGames({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
  const [query, setQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToList = (game: any) => {
    const alreadyAdded = userList.some((g: any) => g.id === game.id);

    if (alreadyAdded) return;

    setUserList((prev) => [...prev, game]);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setResults([]);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/games/?search=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setResults([]);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-gray-800 fixed w-[50%] h-100 rounded-xl text-gray-200 left-1/4 top-1/4">
      <search className="border-2 border-gray-200 w-[75%] h-15 items-center justify-between flex rounded-4xl mx-auto my-5">
        <input
          type="text"
          name="gamename"
          id="gamename"
          className="h-[90%] w-[85%]  mx-2.5 border-none rounded-2xl outline-none px-3 py-0.5"
          placeholder="Search for Video Games"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="w-10 h-10 rounded-4xl bg-blue-200 border border-blue-800 mx-2.5"
          type="button"
          onClick={handleSearch}
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
      {loading && (
        <div className="mx-auto text-gray-400 text-center">Searching . . .</div>
      )}

      <div>
        {results.map((game: any) => (
          <SearchItem
            key={game.id}
            game={game}
            onAdd={addToList}
            isAdded={userList.some((g: any) => g.id === game.id)}
          />
        ))}
      </div>

      <button
        type="button"
        className="absolute text-center right-1 bottom-1 rounded-xl border w-5 h-5 text-sm hover:bg-red-400 transition-colors"
        onClick={handleClose}
      >
        X
      </button>
    </div>
  );
}
