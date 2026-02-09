import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

// import ListItem from "@/components/list-item";
import MyGameList from "@/components/my-game-list";

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
      <MyGameList isOwner={isOwner} userGameList={userGameList} />
    </>
  );
}
