"use client";

import { useState, useEffect } from "react";
import SearchGames from "@/components/search-games";
import ListItem from "@/components/list-item";
import StatusBar from "@/components/status-bar";
import InfoBar from "@/components/info-bar";
import ConfirmationDialogue from "@/components/confirmation-dialogue";
import SideNav from "@/components/side-nav";
import { Status } from "@prisma/client";

export default function Page() {
  const [userList, setUserList] = useState<any[]>([]);
  const [pendingGame, setPendingGame] = useState<any>(null);
  const [activeStatus, setActiveStatus] = useState("all"); // Defaults to all

  const [editingGame, setEditingGame] = useState<any>(null);

  const [selectedStatus, setSelectedStatus] = useState("current"); //default at Currently-Playing
  const [selectedScore, setSelectedScore] = useState<any>(null);
  const [chosenPlatforms, setChosenPlatforms] = useState<any[]>([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const startAddGame = (game: any) => {
    setPendingGame(game);
    setChosenPlatforms([]);
    setSelectedScore(null);
  };

  const confirmAddGame = async (status: Status) => {
    if (chosenPlatforms.length === 0) return;

    const payload = {
      id: activeGame.id,
      name: activeGame.name,
      cover: activeGame.cover,
      year: activeGame.year,
      status,
      platforms: chosenPlatforms,
      score: selectedScore,
    };

    try {
      if (editingGame !== null) {
        await fetch("/api/games", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            id: editingGame.id,
          }),
        });
      } else {
        await fetch("/api/games", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      await fetchGames();
      closeDialogue();
    } catch (error) {
      console.error("Failed to save game: ", error);
    }
  };

  const closeDialogue = () => {
    setPendingGame(null);
    setEditingGame(null);
    setSelectedScore(null);
    setChosenPlatforms([]);
  };

  const removeFromList = async (gameID: number) => {
    const confirm = window.confirm("Remove this game?");
    if (!confirm) return;

    await fetch(`/api/games?id=${gameID}`, { method: "DELETE" });
    await fetchGames();
  };

  const startEditGame = (game: any) => {
    setEditingGame(game);
    setChosenPlatforms(game.platforms ?? []);
    setSelectedScore(game.score ?? null);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const res = await fetch("/api/games");
    const data = await res.json();

    setUserList(Array.isArray(data) ? data : []);
  };

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
            platform={game.platforms.join(", ")}
            score={game.score ?? "--"}
          >
            <button
              className="px-1 hover:underline"
              onClick={() => {
                startEditGame(game);
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
        onClose={() => {
          setIsSearchOpen(false);
          closeDialogue();
        }}
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
