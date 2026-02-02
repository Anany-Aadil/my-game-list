"use client";

import Image from "next/image";
import { useState } from "react";
import SearchItem from "@/components/search-item";
import ListItem from "@/components/list-item";
// import StatusBar from "@/components/status-bar";
import InfoBar from "@/components/info-bar";

export default function Page() {
  const [userList, setUserList] = useState([]);
  const [pendingGame, setPendingGame] = useState(null);
  const [activeStatus, setActiveStatus] = useState("all"); // Defaults to all

  const [selectedStatus, setSelectedStatus] = useState("current"); //default at Currently-Playing
  const [selectedScore, setSelectedScore] = useState(null);
  const [chosenPlatforms, setChosenPlatforms] = useState([]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // const addToList = (game: any) => {
  //   const alreadyAdded = userList.some((g) => g.id === game.id);

  //   if (alreadyAdded) return;

  //   setUserList((prev) => [...prev, game]);
  // };

  const startAddGame = (game) => {
    setPendingGame(game);
    setChosenPlatforms([]);
    setSelectedScore(null);
  };

  const removeFromList = (gameID: string) => {
    const confirm = window.confirm("Remove this game?");
    if (!confirm) return;

    setUserList((prev) => prev.filter((g: any) => g.id !== gameID));
    // console.log("Removed successfully");
  };

  // const handleConfirm = () => {
  //   console.log(selected);
  // };

  const confirmAddGame = (status, score) => {
    if (chosenPlatforms.length === 0) return;

    setUserList((prev) => [
      ...prev,
      {
        ...pendingGame,
        status,
        chosenPlatforms,
        score: selectedScore,
      },
    ]);

    setPendingGame(null);
    setChosenPlatforms([]);
    setSelectedScore(null);
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

  const filteredList =
    activeStatus === "all"
      ? userList
      : userList.filter((game) => game.status === activeStatus);

  return (
    <section className="w-250 m-auto h-1/2">
      {/* Search Box */}
      <div className="bg-gray-800 h-100 rounded-xl text-gray-200 py-2 my-3 relative">
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
          <div className="mx-auto text-gray-400 text-center">
            Searching . . .
          </div>
        )}

        <div>
          {results.map((game: any) => (
            <SearchItem
              key={game.id}
              game={game}
              onAdd={startAddGame}
              isAdded={userList.some((g: any) => g.id === game.id)}
            />
          ))}
        </div>
        {/* Add Confirmation dialogue box  */}
        {pendingGame && (
          <section className="border bg-gray-300 text-black w-4/5 p-2 rounded-2xl mx-auto">
            <div className="flex justify-evenly items-center">
              <div>Add {pendingGame.name} to :</div>
              <select
                name="status"
                id="status"
                value={selectedStatus}
                className="border border-gray-700 bg-gray-900 rounded-xl outline-none p-1 mx-2 text-gray-200 text-sm"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {[
                  { type: 1, label: "Currently Playing", value: "current" },
                  { type: 2, label: "On-Hold", value: "hold" },
                  { type: 3, label: "Completed", value: "complete" },
                  { type: 4, label: "Dropped", value: "dropped" },
                  { type: 5, label: "Plan to Play", value: "planned" },
                ].map((status) => (
                  <option key={status.type} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Platform Selection */}
            <div className="flex justify-evenly items-center">
              <div>Platform(s):</div>
              {pendingGame.platforms?.length > 0 ? (
                pendingGame.platforms.map((pf) => (
                  <label key={pf} className="text-sm flex items-center">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className=""
                      checked={chosenPlatforms.includes(pf)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setChosenPlatforms((prev) => [...prev, pf]);
                        } else {
                          setChosenPlatforms((prev) =>
                            prev.filter((p) => p !== pf),
                          );
                        }
                      }}
                    />
                    {pf}
                  </label>
                ))
              ) : (
                <span>No Platform data available</span>
              )}
            </div>
            {/* Score */}
            <div className="flex justify-around items-center">
              <span>Score:</span>
              <select
                name="scores"
                id="score"
                value={selectedScore ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedScore(val === "" ? null : val);
                }}
                className="outline-none"
              >
                <option value="">-</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <div className="flex justify-between w-1/4">
                <button
                  onClick={() => {
                    confirmAddGame(selectedStatus, selectedScore);
                  }}
                  className="rounded-lg border border-black px-1 py-0.5 text-sm bg-gray-400 hover:bg-blue-900 hover:text-gray-200 transition-colors"
                  disabled={chosenPlatforms.length === 0}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setPendingGame(null)}
                  className="text-sm border rounded-lg px-1 py-0.5 hover:bg-gray-400 bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        )}
        <button
          type="button"
          className="absolute text-center right-1 bottom-1 rounded-xl border w-5 h-5 text-sm bg-red-400 hover:bg-red-600 transition-colors"
          onClick={() => setResults([])}
        >
          X
        </button>
      </div>

      {/* Status Bar */}
      <nav className="flex w-250 bg-gray-200 *:p-4 *:w-40 text-center justify-between *:hover:bg-gray-300 *:transition-colors ">
        <button onClick={() => setActiveStatus("all")} className="">
          All
        </button>
        <button onClick={() => setActiveStatus("current")} className="">
          Currently Playing
        </button>
        <button onClick={() => setActiveStatus("hold")} className="">
          On-Hold
        </button>
        <button onClick={() => setActiveStatus("complete")} className="">
          Completed
        </button>
        <button onClick={() => setActiveStatus("dropped")} className="">
          Dropped
        </button>
        <button onClick={() => setActiveStatus("planned")} className="">
          Plan to Play
        </button>
      </nav>
      <InfoBar />
      {/* Main List */}
      <main className="">
        {filteredList.map((game: any, index: number) => (
          <ListItem
            sno={index + 1}
            key={game.id}
            name={game.name}
            cover={game.cover}
            platform={game.chosenPlatforms.join(", ")}
            score={game.score ?? "--"}
          >
            <button onClick={() => removeFromList(game.id)}>Remove</button>
          </ListItem>
        ))}
      </main>
    </section>
  );
}
