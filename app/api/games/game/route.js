import { NextResponse } from "next/server";
import getAccessToken from "@/lib/access-token";

const IGDB_GAMES_URL = "https://api.igdb.com/v4/games";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("slug");

  const access_token = await getAccessToken();

  const igdb_response = await fetch(IGDB_GAMES_URL, {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "text/plain",
    },
    body: `
            fields name, storyline, summary, cover.url, platforms.name, release_dates.y, rating, involved_companies.company.name, similar_games.name, similar_games.cover.url, genres.name;
            where id = ${gameId};
            `,
  });

  const recievedGame = await igdb_response.json();
  const game = recievedGame[0];

  const cleanedGame = {
    id: game.id,
    name: game.name,
    cover: game.cover
      ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
      : null,
    storyline: game.storyline,
    summary: game.summary,
    similarGames:
      game.similar_games?.map((s_game) => ({
        id: s_game.id,
        name: s_game.name,
        cover: `https:${s_game.cover.url.replace("t_thumb", "t_cover_big")}`,
      })) ?? [],
    companies: game.involved_companies?.map((co) => co.company.name) ?? [],
    platforms: game.platforms?.map((p) => p.name) ?? [],
    year: game.release_dates?.map((rd) => rd.y)[0],
    rating: game.rating,
    genres: game.genres?.map((g) => g.name) ?? [],
  };

  return NextResponse.json(cleanedGame);
}
