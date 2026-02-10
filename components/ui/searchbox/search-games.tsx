"use client";

import { useState } from "react";

import SearchItem from "@/components/ui/searchbox/search-item";
import { SearchItemsSkeleton } from "../skeletons";
import { SearchIcon, CloseIcon } from "@/components/ui/icons";

export default function SearchGames({
  isOpen,
  onClose,
  children,
  userList,
  startAddGame,
}: {
  isOpen: boolean;
  onClose: any;
  children: React.ReactNode;
  userList: React.ComponentState;
  startAddGame: any;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setResults([]);
    setSearching(true);

    try {
      const res = await fetch(
        `/api/search/?search=${encodeURIComponent(query)}`,
      );
      const data = await res.json();

      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (error) {
      console.error("Search failed: ", error);
    } finally {
      setSearching(false);
    }
  };

  const handleClose = () => {
    setResults([]);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const checkIfAdded = (game: any) =>
    userList.some((g: any) => g.gameId === game.id);

  return (
    <section className="bg-neutral-900 fixed w-[75%] h-160 rounded-sm text-gray-200 left-1/8 top-1/12 shadow-2xl shadow-gray-900">
      <search className="border border-neutral-500 w-[75%] h-12 items-center justify-between flex rounded-xl mx-auto mt-10 mb-5">
        <input
          type="text"
          name="gamename"
          id="gamename"
          className="flex-1 h-full border-none rounded-l-xl outline-none px-3 py-0.5 bg-neutral-800"
          placeholder="Search for Video Games"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="h-full aspect-square rounded-r-xl bg-neutral-900 hover:bg-neutral-800 border-l cursor-pointer border-neutral-700"
          type="button"
          onClick={handleSearch}
        >
          <SearchIcon
            className="mx-auto text-neutral-200"
            fillColor="currentColor"
          />
        </button>
      </search>
      <div className="max-h-92 overflow-y-auto custom-vertical-scroll">
        {searching && (
          <div className="mx-auto text-gray-400 text-center">
            {/* Searching... <br /> */}
            <SearchItemsSkeleton />
          </div>
        )}

        {
          // Array.isArray(results) &&
          results.map((game: any, index: number) => (
            <SearchItem
              key={game.id}
              idx={index}
              game={game}
              onAdd={startAddGame}
              isAdded={checkIfAdded(game)}
            />
          ))
        }
      </div>
      {/* Confirmation Dialogue here */}
      {children}
      <button
        type="button"
        className="absolute text-center -right-3 -bottom-3 rounded-4xl w-8 aspect-square hover:bg-neutral-600 transition-colors font-bold bg-neutral-800"
        onClick={handleClose}
      >
        <CloseIcon
          className="w-full h-full text-neutral-200"
          fillColor="currentColor"
        />
      </button>
    </section>
  );
}
