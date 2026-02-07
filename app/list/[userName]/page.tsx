import { getServerSession } from "next-auth";

import ListItem from "@/components/list-item";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = await params;

  const user = await prisma.user.findUnique({
    where: { userName },
    include: { games: true },
  });

  if (!user) notFound();

  const session = await getServerSession(authOptions);

  const isOwner = session?.user?.email === user.email;

  return (
    <div>
      <h1>User List</h1>
      {user.games?.map((game: any, index: number) => (
        <ListItem
          sno={index + 1}
          key={game.id}
          name={game.name}
          cover={game.cover}
          platform={game.platforms.join(", ")}
          score={game.score ?? "--"}
        >
          ()
        </ListItem>
      ))}
    </div>
  );
}
