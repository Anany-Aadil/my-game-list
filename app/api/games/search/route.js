import { NextResponse } from "next/server";
import getAccessToken from "@/lib/access-token";

const IGDB_GAMES_URL = "https://api.igdb.com/v4/games";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  if (!search) {
    return NextResponse.json([]);
  }

  const access_token = await getAccessToken();

  const igdb_response = await fetch(IGDB_GAMES_URL, {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "text/plain",
    },
    body: `
            search "${search}";
            fields name, cover.url, platforms.name, release_dates.y;
            limit 10;
            `,
  });

  const games = await igdb_response.json();

  const cleanGames = games.map((game) => ({
    id: game.id,
    name: game.name,
    cover: game.cover
      ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
      : null,
    platforms: game.platforms?.map((p) => p.name) ?? [],
    year: game.release_dates?.map((rd) => rd.y)[0],
  }));

  return NextResponse.json({ results: cleanGames });
}
