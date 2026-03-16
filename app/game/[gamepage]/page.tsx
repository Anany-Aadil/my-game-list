import GameSpecificPage from "@/components/ui/gamepage/game-page";

import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function GamePage({
  params,
}: {
  params: { gamepage: number };
}) {
  const session = await getServerSession(authOptions);
  const { gamepage } = await params;

  if (session) {
    const userName = session?.user.userName;

    const user = await prisma.user.findUnique({
      where: { userName },
      include: {
        games: {
          include: {
            game: true,
          },
        },
      },
    });

    const currentGame = user?.games.find(
      (game) => game.gameId === Number(gamepage),
    );

    return <GameSpecificPage gameId={gamepage} gameStats={currentGame} />;
  } else {
    return <GameSpecificPage gameId={gamepage} />;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { gamepage: number };
}): Promise<Metadata> {
  const { gamepage } = await params;

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/game/?gameId=${await gamepage}`,
  );
  const game = await res.json();

  return {
    title: game.name,
    description: game.summary.slice(0, 32),
  };
}
