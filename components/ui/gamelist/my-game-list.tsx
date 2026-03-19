"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Status } from "@prisma/client";

import SearchGames from "./searchbox/search-games";
import ListItem from "@/components/ui/gamelist/list-item";
import StatusBar from "@/components/ui/gamelist/navs/status-bar";
import InfoBar from "@/components/ui/gamelist/navs/info-bar";
import ConfirmationDialogue from "./searchbox/confirmation-dialogue";
import SideNav from "@/components/ui/gamelist/navs/side-nav";

import { sortItems } from "@/lib/sort-items";
import EditButton from "./edit-button";
import Placeholder from "./placeholder";

export default function MyGameList({
  isOwner,
  userGameList,
}: {
  isOwner: boolean;
  userGameList: any[];
}) {
  const [userList, setUserList] = useState<any[]>([]);
  const [pendingGame, setPendingGame] = useState<any>(null);
  const [activeStatus, setActiveStatus] = useState("all"); // Defaults to all

  const [editingGame, setEditingGame] = useState<any>(null);

  const [selectedStatus, setSelectedStatus] = useState("unselected");
  const [selectedScore, setSelectedScore] = useState<any>(null);
  const [chosenPlatforms, setChosenPlatforms] = useState<string[]>([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [confirming, setConfirming] = useState(false);

  const router = useRouter();

  const startAddGame = (game: any) => {
    setPendingGame(game);
    setChosenPlatforms([]);
    setSelectedScore(null);
  };

  const confirmAddGame = async (status: Status) => {
    setConfirming(true);

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
        await fetch("/api/gamelist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            id: editingGame.id,
          }),
        });
      } else {
        await fetch("/api/gamelist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      await fetchGames();
      closeDialogue();
      setConfirming(false);
      router.refresh();
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

    setUserList((prev) => prev.filter((g) => g.id !== gameID));
    await fetch(`/api/gamelist?id=${gameID}`, { method: "DELETE" });
    await fetchGames();
    router.refresh();
  };

  const startEditGame = (game: any) => {
    setEditingGame(game);
    setChosenPlatforms(game.platforms ?? []);
    setSelectedScore(game.score ?? null);
  };

  if (isOwner)
    useEffect(() => {
      fetchGames();
    }, []);

  const fetchGames = async () => {
    const res = await fetch("/api/gamelist");
    const data = await res.json();

    setUserList(Array.isArray(data) ? data : []);
  };

  const filteredList =
    activeStatus === "all"
      ? userGameList
      : userGameList.filter((game: any) => game.status === activeStatus);

  const sortedGames = sortItems(filteredList, activeStatus);

  const activeGame = pendingGame || editingGame;
  const isEditing = Boolean(editingGame);

  return (
    <section className="md:w-250 max-w-full m-auto font-sans md:mt-0 mt-15">
      {/* Status Bar */}
      <StatusBar onStatusClick={setActiveStatus} activeStatus={activeStatus} />
      {/* Main List */}
      <InfoBar />
      <main className="grid grid-cols-2 md:block w-full gap-1 relative">
        {sortedGames.length > 0 ? (
          sortedGames.map((gameDetail: any, index: number) => (
            <ListItem
              sno={index + 1}
              id={gameDetail.gameId}
              key={gameDetail.gameId}
              name={gameDetail.game.name}
              cover={gameDetail.game.cover}
              platform={gameDetail.platforms.join(", ")}
              score={gameDetail.score ?? "--"}
              status={gameDetail.status}
            >
              {isOwner ? (
                <>
                  <EditButton
                    onPress={() => {
                      startEditGame(gameDetail);
                      setIsSearchOpen(true);
                    }}
                  >
                    <span className="hidden md:inline">Edit</span>
                    <span className="md:hidden">
                      <i className="fa-pen-to-square fa-solid text-neutral-900 text-lg pt-0.5"></i>
                    </span>
                  </EditButton>
                  <EditButton onPress={() => removeFromList(gameDetail.id)}>
                    <span className="hidden md:inline">Remove</span>
                    <span className="md:hidden">
                      <i className="fa-square-minus fa-regular text-neutral-900 text-lg pt-0.5"></i>
                    </span>
                  </EditButton>
                </>
              ) : (
                ""
              )}
            </ListItem>
          ))
        ) : isOwner ? (
          // Placeholder
          <Placeholder>
            <span className="md:mx-5">Add a game to the list... </span>
            <button
              className="text-indigo-800 hover:text-indigo-700 transition-colors smoothing hover:underline md:mx-5"
              onClick={() => setIsSearchOpen(true)}
            >
              {" "}
              Click Here{" "}
            </button>
          </Placeholder>
        ) : (
          <Placeholder>
            <span className="mx-5">Nothing to See here </span>
          </Placeholder>
        )}
      </main>
      {isOwner ? (
        <>
          <SideNav
            usersList={userGameList}
            onAddClick={() => setIsSearchOpen(true)}
          />
          <SearchGames
            userList={userList}
            startAddGame={startAddGame}
            onClose={() => {
              setIsSearchOpen(false);
              closeDialogue();
            }}
            isOpen={isSearchOpen}
            isEditing={isEditing}
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
                confirming={confirming}
              />
            )}
          </SearchGames>
        </>
      ) : null}
    </section>
  );
}
