import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UserSetup from "@/components/ui/homepage/user-setup";

export default async function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  let needsUserName = false;

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { userName: true },
    });

    needsUserName = !user?.userName;
  }

  return (
    <>
      {needsUserName && <UserSetup />}
      {children}
    </>
  );
}
