import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const games = await prisma.game.findMany({
    where: { userId: params.id },
  });

  return NextResponse.json(games);
}
