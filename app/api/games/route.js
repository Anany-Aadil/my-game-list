import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  // console.log("user id: ", session.user.name);

  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: "asc" },
      where: { userId: session.user.id },
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Failed to fetch games list" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

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
        userId: session.user.id,
      },
    });

    return NextResponse.json(gameData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add game" }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  const body = await request.json();

  const gameData = await prisma.game.update({
    where: { id: body.id, userId: session.user.id },
    data: {
      status: body.status,
      platforms: body.platforms,
      score: body.score,
    },
  });

  return NextResponse.json(gameData);
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) return NextResponse.json({ error: "Missing Id" }, { status: 500 });

  await prisma.game.delete({ where: { id, userId: session.user.id } });

  return NextResponse.json({ success: true });
}

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  return session;
}
