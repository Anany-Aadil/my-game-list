import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

import MyGameList from "@/components/ui/gamelist/my-game-list";
import { Metadata } from "next";
import Header from "@/components/ui/homepage/header";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = await params;

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

  if (!user) notFound();

  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.email === user.email;

  const userGameList = user.games;

  return (
    <>
      <header className="md:hidden">
        <Header />
      </header>
      <MyGameList isOwner={isOwner} userGameList={userGameList} />;
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { userName: string };
}): Promise<Metadata> {
  const { userName } = await params;
  return {
    title: `${userName}'s Game List`,
  };
}
