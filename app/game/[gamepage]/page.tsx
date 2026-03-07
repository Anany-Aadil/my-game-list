import { Metadata } from "next";
import GameSpecificPage from "@/components/ui/gamepage/game-page";

export default async function GamePage({
  params,
}: {
  params: { gamepage: number };
}) {
  const { gamepage } = await params;
  return <GameSpecificPage gameId={gamepage} />;
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
