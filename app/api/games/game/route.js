import { NextResponse } from "next/server";

const RAWG_API_URL = "https://api.rawg.io/api/games";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchId = searchParams.get("gameId");

  if (!searchId) {
    return NextResponse.json([]);
  }

  try {
    const properRes = await fetch(
      `${RAWG_API_URL}/${searchId}?key=${process.env.RAWG_API_KEY}`,
    );

    const properData = await properRes.json();

    return NextResponse.json(properData);
  } catch (error) {}
}
