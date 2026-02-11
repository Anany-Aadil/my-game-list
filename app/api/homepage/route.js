import { NextResponse } from "next/server";

const RAWG_API_URL = "https://api.rawg.io/api/games";

export async function GET() {
  try {
    const res = await fetch(
      `${RAWG_API_URL}?key=${process.env.RAWG_API_KEY}&metacritic=90,100`,
    );
    const data = await res.json();
    const gameData = data.results.slice(0, 10);

    return NextResponse.json(gameData);
  } catch (error) {
    console.error(error);
  }
}

function getRandomElements(array, n) {
  const copy = [...array];

  // Fisher-Yates Shuffle. //TODO Reduce O(n)
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}
