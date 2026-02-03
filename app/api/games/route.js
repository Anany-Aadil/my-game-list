import { NextResponse } from "next/server";

const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const IGDB_GAMES_URL = "https://api.igdb.com/v4/games";

async function getAccessToken() {
  const response = await fetch(
    `${TWITCH_TOKEN_URL}?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: "POST" },
  );

  const data = await response.json();

  return data.access_token;
}

export async function GET(request) {
  try {
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
            fields name, cover.url, platforms.name;
            limit 5;
            `,
    });

    const games = await igdb_response.json();

    const cleanGames = games.map((game) => ({
      id: game.id,
      name: game.name,
      cover: game.cover
        ? `https://${game.cover.url.replace("t_thumb", "t_cover_big")}`
        : null,
      // cover: game.cover?.url?.replace("t_thumb", "t_cover_big"),
      platforms: game.platforms?.map((p) => p.name) ?? [],
    }));

    return NextResponse.json({ results: cleanGames });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
