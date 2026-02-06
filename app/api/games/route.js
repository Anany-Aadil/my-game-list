import { prisma } from "@/components/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games list" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const gameData = await prisma.game.create({
      data: {
        id: body.id,
        name: body.name,
        cover: body.cover,
        year: body.year,
        status: body.status,
        score: body.score,
        platforms: body.platforms,
      },
    });

    return NextResponse.json(gameData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add game" }, { status: 500 });
  }
}

export async function PUT(request) {
  const body = await request.json();

  const gameData = await prisma.game.update({
    where: { id: body.id },
    data: {
      status: body.status,
      platforms: body.platforms,
      score: body.score,
    },
  });

  return NextResponse.json(gameData);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) return NextResponse.json({ error: "Missing Id" }, { status: 500 });

  await prisma.game.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
