"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();

  const userDetail = session?.user;

  return (
    <div className="flex w-1/4 justify-between items-center-safe text-neutral-100 mx-5">
      <div className="">
        <span className="text-sm mx-2">
          {userDetail?.name ? userDetail.name : "Welcome"}
        </span>
        <span className="text-sm mx-2">
          {userDetail?.userName ? <>({userDetail.userName})</> : "Gamer"}
        </span>
      </div>
      <Image
        src={userDetail?.image ? userDetail.image : "/images/acc.png"}
        width={25}
        height={25}
        alt={userDetail?.name ? userDetail.name : "No User Found"}
        className="rounded-sm mx-2"
      />
      {session ? (
        <LogButton onPress={() => signOut()}>Logout</LogButton>
      ) : (
        <LogButton onPress={() => signIn("google")}>Login</LogButton>
      )}
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
      className="bg-neutral-600 h-6 w-20 rounded-sm text-neutral-50 mx-5 text-sm hover:bg-neutral-400 transition-colors hover:text-neutral-900 font-delius cursor-pointer"
    >
      {children}
    </button>
  );
}
