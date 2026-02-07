import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { userName } = await req.json();

  if (!userName || userName.length < 3 || userName.length > 32) {
    return NextResponse.json(
      { error: "Invalid Username length" },
      { status: 400 },
    );
  }

  const exists = await prisma.user.findUnique({
    where: { userName },
  });

  if (exists) {
    return NextResponse.json(
      { error: "UserName Already Taken" },
      { status: 409 },
    );
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { userName },
  });

  return NextResponse.json({ success: true });
}
