import { NextResponse } from "next/server";
import getAccessToken from "@/lib/access-token";

const IGDB_GAMES_URL = "https://api.igdb.com/v4/games";

export async function GET() {
  const access_token = await getAccessToken();

  const igdb_response = await fetch(IGDB_GAMES_URL, {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "text/plain",
    },
    body: `
            fields name, cover.url;
            where release_dates.date > ${Math.round(Date.now() / 1000)} | release_dates.human = "TBD" & rating = null;
            sort hypes desc;
            limit 10;
            `,
  });

  if (!igdb_response.ok)
    return NextResponse.json({ error: "IGDB API Failed" }, { status: 500 });

  try {
    const trendingGames = await igdb_response.json();

    const cleanTrendingGames = trendingGames.map((game) => ({
      id: game.id,
      name: game.name,
      cover: game.cover
        ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
        : null,
    }));

    return NextResponse.json(cleanTrendingGames);
  } catch (error) {
    return NextResponse.json({ error: "Network Error" }, { status: 500 });
  }
}
