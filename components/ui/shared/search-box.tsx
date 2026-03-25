"use client";

import { useState } from "react";
import { SearchItemsSkeleton } from "../skeletons";
import Thumbnail from "./thumbnail";

export default function SearchBox({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: CallableFunction;
}) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearchResults([]);
    setSearching(true);

    const res = await fetch(
      `/api/gamelist/search/?search=${encodeURIComponent(query)}`,
    );
    if (!res.ok) {
      console.error("Search failed: ", res.status);
      return;
    }

    let data;

    const dummyData = {
      id: 0,
      name: "Oops! Couldn't Find anything. Try something different",
      year: "",
      platforms: [""],
      cover: "https://unsplash-assets.imgix.net/empty-states/photos.png",
    };

    try {
      data = await res.json();
      setSearchResults(
        Array.isArray(data.results) && data.results.length > 0
          ? data.results
          : [dummyData],
      );
      console.log(searchResults);
      setSearching(false);
    } catch (err) {
      console.error("Invalid Json: ", err);
      return;
    }
  };

  const handleClose = () => {
    setSearchResults([]);
    onClose();
    setQuery("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed w-screen h-screen bg-transparent top-0 bottom-0 left-0 right-0"
      ></div>
      <section className="bg-neutral-950 fixed md:w-2/3 w-9/10 md:h-150 h-180 rounded-sm text-neutral-200 md:left-1/6 left-1/20 top-1/9 shadow-2xl shadow-neutral-900">
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
        <main className="max-h-4/5 overflow-y-auto custom-vertical-scroll relative w-full">
          {searching && (
            <div className="mx-auto text-center">
              <SmallText>Searching...</SmallText>
              <SearchItemsSkeleton />
            </div>
          )}
          <Results
            category={searchResults}
            text={query.length !== 0 ? "Search Results" : "Search for a game"}
          />
        </main>
        <button
          type="button"
          className="absolute text-center -right-3 -bottom-3 rounded-4xl w-8 aspect-square hover:bg-neutral-800 transition-colors font-bold bg-neutral-950 cursor-pointer"
          onClick={handleClose}
        >
          <i className="fa-circle-xmark fa-regular text-2xl py-1 md:py-0.5"></i>
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

function Results({ text, category }: { text: string; category: Array<any> }) {
  return (
    <>
      <SmallText>{text}</SmallText>
      <div className="relative grid grid-cols-2 md:grid-cols-4 w-9/10 mx-auto gap-1">
        {category.map((game: any) => (
          <Thumbnail game={game} key={game.id} />
        ))}
      </div>
    </>
  );
}
