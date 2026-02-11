"use client";

import { useState, useEffect } from "react";
import Banner from "./banner";

export default function MainPage() {
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState<any>(null);

  let randomGame = Math.floor(Math.random() * trending.length);

  const fetchTrending = async () => {
    setLoading(true);
    const res = await fetch("/api/homepage");
    const data = await res.json();

    setTrending(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    setCurrentGame(trending[randomGame]);
  }, [trending]);

  return (
    <section className="w-full h-screen bg-neutral-900">
      <main>
        {loading ? (
          <>
            <div>Loading...</div>
          </>
        ) : (
          <>
            <Banner currentGame={currentGame} />
          </>
        )}
      </main>
      <main className="bg-linear-to-t from-neutral-900 via-neutral-900 to-transparent h-[30vh] w-full absolute -bottom-18.75"></main>
    </section>
  );
}
