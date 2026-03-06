import { NextResponse } from "next/server";
import getAccessToken from "@/lib/access-token";

const IGDB_GAMES_URL = "https://api.igdb.com/v4/games";

export async function GET() {
  const access_token = await getAccessToken();

  const currentTime = Math.round(Date.now() / 1000);
  const yearAgo = Math.round(new Date("2025-12-06").getTime() / 1000);

  const igdb_response = await fetch(IGDB_GAMES_URL, {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "text/plain",
    },
    body: `
            fields name, cover.url;
            where release_dates.date < ${currentTime} & release_dates.date > ${yearAgo} & hypes > 40 & id > 20000;
            sort release_dates asc;
            limit 10;
            `,
  });

  if (!igdb_response.ok)
    return NextResponse.json({ error: "IGDB API Failed" }, { status: 500 });

  try {
    const newlyReleasedGames = await igdb_response.json();

    const cleanedGames = newlyReleasedGames.map((game) => ({
      id: game.id,
      name: game.name,
      cover: game.cover
        ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
        : null,
    }));

    return NextResponse.json(cleanedGames);
  } catch (error) {
    return NextResponse.json({ error: "Network Error" }, { status: 500 });
  }
}
