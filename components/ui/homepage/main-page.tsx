"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function MainPage() {
  const [trending, setTrending] = useState<any[]>([]);

  const fetchTrending = async () => {
    const res = await fetch("/api/games/trending");
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      setTrending(data);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <section className="w-full h-150">
      <main></main>
    </section>
  );
}
