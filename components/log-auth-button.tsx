"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="px-5 mx-5">
        <LogButton onPress={() => signIn("google")}>Login</LogButton>
      </div>
    );

  const userDetail = session.user;

  return (
    <div className="flex w-1/3 justify-around items-center-safe">
      <div className="text-sm bg-neutral-400 text-neutral-800 px-2 py-1 hover:bg-neutral-500 hover:text-neutral-900 transition-colors">
        <Link href={`/userlist/${userDetail.userName}`}>GameList</Link>
      </div>
      <span className="text-sm">{userDetail.name}</span>
      <Image
        src={userDetail.image ? userDetail.image : "/vercel.svg"}
        width={25}
        height={25}
        alt={userDetail.name ? userDetail.name : "No User Found"}
        className="rounded-sm"
      />
      <LogButton onPress={() => signOut()}>Logout</LogButton>
    </div>
  );
}

function LogButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: any;
}) {
  return (
    <button
      onClick={onPress}
      className="bg-neutral-600 h-6 w-20 rounded-sm text-amber-50 mx-5 text-sm hover:bg-neutral-400 transition-colors hover:text-neutral-900"
    >
      {children}
    </button>
  );
}
