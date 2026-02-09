import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  try {
    const games = await prisma.userGame.findMany({
      orderBy: { createdAt: "asc" },
      where: { userId: session.user.id },
      include: {
        game: true,
      },
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

    await prisma.game.upsert({
      where: { id: body.id },
      update: {},
      create: {
        id: body.id,
        name: body.name,
        cover: body.cover,
        year: body.year,
      },
    });

    // const gameData = await prisma.userGame.create({
    //   data: {
    //     gameId: body.id,
    //     userId: session.user.id,
    //     status: body.status,
    //     score: body.score,
    //     platforms: body.platforms,
    //   },
    // });

    const gameData = await prisma.userGame.upsert({
      where: {
        userId_gameId: {
          userId: session.user.id,
          gameId: body.id,
        },
      },

      update: {
        status: body.status,
        score: body.score,
        platforms: body.platforms,
      },

      create: {
        userId: session.user.id,
        gameId: body.id,
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
  const session = await getServerSession(authOptions);
  const body = await request.json();

  const gameData = await prisma.userGame.update({
    // where: {
    //   userId_gameId: {
    //     userId: session.user.id,
    //     gameId: body.gameId,
    //   },
    // },
    where: { id: body.id, userId: session.user.id },
    data: {
      status: body.status,
      platforms: body.platforms,
      score: body.score,
    },
  });

  // console.log({
  //   sessionUserId: session.user.id,
  //   bodyId: body.id,
  //   bodyGameId: body.gameId,
  // });

  // const gameData = await prisma.userGame.upsert({
  //   where: {
  //     userId_gameId: {
  //       userId: session.user.id,
  //       gameId: body.id,
  //     },
  //   },
  //   update: {
  //     status: body.status,
  //     platforms: body.platforms,
  //     score: body.score,
  //   },
  //   create: {
  //     status: body.status,
  //     score: body.score,
  //     platforms: body.platforms,

  //     user: {
  //       connect: {
  //         id: session.user.id,
  //       },
  //     },
  //     game: {
  //       connectOrCreate: {
  //         where: { id: body.id },
  //         create: {
  //           id: body.gameId,
  //           name: body.name,
  //           cover: body.cover,
  //           platforms: body.platforms,
  //         },
  //       },
  //     },
  //   },
  // });

  return NextResponse.json(gameData);
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) return NextResponse.json({ error: "Missing Id" }, { status: 500 });

  // await prisma.userGame.delete({
  //   where: {
  //     userId_gameId: {
  //       gameId: id,
  //       userId: session.user.id,
  //     },
  //   },
  // });
  await prisma.userGame.delete({ where: { id, userId: session.user.id } });

  return NextResponse.json({ success: true });
}
