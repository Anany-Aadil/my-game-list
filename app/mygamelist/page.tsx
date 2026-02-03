"use client";

import { useState, useEffect } from "react";
import SearchGames from "@/components/search-games";
import ListItem from "@/components/list-item";
import StatusBar from "@/components/status-bar";
import InfoBar from "@/components/info-bar";
import ConfirmationDialogue from "@/components/confirmation-dialogue";
import SideNav from "@/components/side-nav";

export default function Page() {
  const [userList, setUserList] = useState<any[]>([]);
  const [pendingGame, setPendingGame] = useState<any>(null);
  const [activeStatus, setActiveStatus] = useState("all"); // Defaults to all

  const [editingGame, setEditingGame] = useState(null);
  const [editingIndex, setEditionIndex] = useState<any>(null);

  const [selectedStatus, setSelectedStatus] = useState("current"); //default at Currently-Playing
  const [selectedScore, setSelectedScore] = useState<any>(null);
  const [chosenPlatforms, setChosenPlatforms] = useState<any[]>([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Open the confirmation dialogue

  const startAddGame = (game: any) => {
    setPendingGame(game);
    setChosenPlatforms([]);
    setSelectedScore(null);
  };

  // Whatever happens after opening the confirmation is here

  const confirmAddGame = (status: any) => {
    if (chosenPlatforms.length === 0) return;

    if (editingGame !== null) {
      setUserList((prev: any[]) =>
        prev.map((item: any[], idx: number) =>
          idx === editingIndex
            ? {
                ...item,
                status,
                chosenPlatforms,
                score: selectedScore,
              }
            : item,
        ),
      );
    } else {
      setUserList((prev: any[]) => [
        ...prev,
        {
          ...pendingGame,
          status,
          chosenPlatforms,
          score: selectedScore,
        },
      ]);
    }
    closeDialogue();
  };

  const closeDialogue = () => {
    setPendingGame(null);
    setEditingGame(null);
    setEditionIndex(null);
    setChosenPlatforms([]);
    setSelectedScore(null);
  };

  // Remove the item

  const removeFromList = (gameID: string) => {
    const confirm = window.confirm("Remove this game?");
    if (!confirm) return;

    setUserList((prev: any[]) => prev.filter((g: any) => g.id !== gameID));
  };

  // Edit the item

  const startEditGame = (game: any, index: number) => {
    setEditingGame(game);
    setEditionIndex(index);

    setChosenPlatforms(game.chosenPlatforms ?? []);
    setSelectedScore(game.score ?? null);
  };

  useEffect(() => {
    const storedList = localStorage.getItem("myGameList");

    if (storedList) setUserList(JSON.parse(storedList));
  }, []);

  useEffect(
    () => localStorage.setItem("myGameList", JSON.stringify(userList)),
    [userList],
  );

  const filteredList =
    activeStatus === "all"
      ? userList
      : userList.filter((game: any) => game.status === activeStatus);

  const activeGame = pendingGame || editingGame;
  const isEditing = Boolean(editingGame);

  return (
    <section className="w-250 m-auto h-1/2">
      {/* Status Bar */}
      <StatusBar onStatusClick={setActiveStatus} activeStatus={activeStatus} />
      {/* Main List */}
      <InfoBar />
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
            <button
              className="px-1 hover:underline"
              onClick={() => {
                startEditGame(game, index);
                setIsSearchOpen(true);
              }}
            >
              Edit
            </button>
            <button
              className="px-1 hover:underline"
              onClick={() => removeFromList(game.id)}
            >
              Remove
            </button>
          </ListItem>
        ))}
      </main>
      <SideNav onClick={() => setIsSearchOpen(true)} />

      <SearchGames
        userList={userList}
        startAddGame={startAddGame}
        startEditGame={startEditGame}
        onClose={() => setIsSearchOpen(false)}
        isOpen={isSearchOpen}
      >
        {(pendingGame || editingGame) && (
          <ConfirmationDialogue
            isEditing={isEditing}
            activeGame={activeGame}
            setPendingGame={setPendingGame}
            setEditingGame={setEditingGame}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedScore={selectedScore}
            setSelectedScore={setSelectedScore}
            chosenPlatforms={chosenPlatforms}
            setChosenPlatforms={setChosenPlatforms}
            confirmAddGame={confirmAddGame}
          />
        )}
      </SearchGames>
    </section>
  );
}
