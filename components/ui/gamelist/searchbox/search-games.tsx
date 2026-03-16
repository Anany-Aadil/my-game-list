"use client";

import { useEffect, useState } from "react";

import SearchItem from "./search-item";
import { SearchItemsSkeleton } from "../../skeletons";

export default function SearchGames({
  isOpen,
  onClose,
  children,
  userList,
  startAddGame,
  isEditing,
}: {
  isOpen: boolean;
  onClose: CallableFunction;
  children: React.ReactNode;
  userList: Array<any>;
  startAddGame: CallableFunction;
  isEditing: boolean;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [trending, setTrending] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setResults([]);
    setSearching(true);

    const res = await fetch(
      `/api/gamelist/search/?search=${encodeURIComponent(query)}`,
    );
    if (!res.ok) {
      console.error("Search failed: ", res.status);
      return;
    }

    let data;

    try {
      data = await res.json();
      setResults(Array.isArray(data.results) ? data.results : []);
      setSearching(false);
    } catch (err) {
      console.error("Invalid Json: ", err);
      return;
    }
  };

  useEffect(() => {
    if (query.trim() !== "") return;

    fetch("/api/category/toprated")
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
    <>
      <div
        onClick={handleClose}
        className="fixed w-screen h-screen bg-transparent top-0 bottom-0 left-0 right-0"
      ></div>
      <section className="bg-neutral-950 fixed md:w-3/4 w-9/10 md:h-160 h-4/5 rounded-sm text-neutral-200 md:left-1/8 left-1/20 top-1/12 shadow-2xl shadow-neutral-900">
        <form
          id="list_search"
          className="border border-neutral-500 w-9/10 h-12 items-center justify-between flex rounded-xl mx-auto mt-10 mb-5"
          onSubmit={handleSearch}
        >
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
            type="submit"
            form="list_search"
          >
            <i className="fa-magnifying-glass fa-solid"></i>
          </button>
        </form>
        <div className="max-h-92 overflow-y-auto custom-vertical-scroll">
          {searching && (
            <div className="mx-auto text-center">
              <SmallText>Searching...</SmallText>
              <SearchItemsSkeleton />
            </div>
          )}
          {results.length === 0 && Array.isArray(trending) ? (
            <Results
              category={trending}
              isEditing={isEditing}
              startAddGame={startAddGame}
              checkIfAdded={checkIfAdded}
              text="Top Rated Games"
            />
          ) : (
            <Results
              category={results}
              isEditing={isEditing}
              startAddGame={startAddGame}
              checkIfAdded={checkIfAdded}
              text="Search Results"
            />
          )}
        </div>
        {/* Confirmation Dialogue here */}
        {children}
        <button
          type="button"
          className="absolute text-center -right-3 -bottom-3 rounded-4xl w-8 aspect-square hover:bg-neutral-800 transition-colors font-bold bg-neutral-950 cursor-pointer"
          onClick={handleClose}
        >
          <i className="fa-circle-xmark fa-regular text-2xl pt-1 md:pt-0.5"></i>
        </button>
      </section>
    </>
  );
}

function SmallText({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-9/10 mx-auto text-neutral-900 bg-indigo-600 text-center text-sm rounded-t">
      {children}
    </div>
  );
}

function Results({
  text,
  category,
  isEditing,
  startAddGame,
  checkIfAdded,
}: {
  text: string;
  category: Array<any>;
  isEditing: boolean;
  startAddGame: CallableFunction;
  checkIfAdded: CallableFunction;
}) {
  return (
    <>
      <SmallText>{text}</SmallText>
      {category.map((game: any, index: number) => (
        <SearchItem
          key={game.id}
          isEditing={isEditing}
          idx={index}
          game={game}
          onAdd={startAddGame}
          isAdded={checkIfAdded(game)}
        />
      ))}
    </>
  );
}
