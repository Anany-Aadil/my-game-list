"use client";

import { useEffect, useState } from "react";

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
  const [trending, setTrending] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setResults([]);
    setSearching(true);

    const res = await fetch(
      `/api/games/search/?search=${encodeURIComponent(query)}`,
    );
    const data = await res.json();

    setResults(Array.isArray(data.results) ? data.results : []);
    setSearching(false);
  };

  useEffect(() => {
    if (query.trim() !== "") return;

    fetch("/api/games/trending")
      .then((res) => res.json())
      .then(setTrending)
      .catch(console.error);
  }, [query]);

  const handleClose = () => {
    setResults([]);
    onClose();
    setQuery("");
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
          <div className="mx-auto text-center">
            <SmallText>Searching...</SmallText>
            <SearchItemsSkeleton />
          </div>
        )}

        {results.length === 0 && Array.isArray(trending) ? (
          <>
            <SmallText>Top Rated Games</SmallText>
            {trending.map((game: any, index: number) => (
              <SearchItem
                key={game.id}
                idx={index}
                game={game}
                onAdd={startAddGame}
                isAdded={checkIfAdded(game)}
              />
            ))}
          </>
        ) : (
          <>
            <SmallText>Search Results</SmallText>
            {results.map((game: any, index: number) => (
              <SearchItem
                key={game.id}
                idx={index}
                game={game}
                onAdd={startAddGame}
                isAdded={checkIfAdded(game)}
              />
            ))}
          </>
        )}
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

function SmallText({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-9/10 mx-auto text-neutral-900 bg-indigo-600 text-center text-sm rounded-t">
      {children}
    </div>
  );
}
