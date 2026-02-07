"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="px-5 mx-5">
        <button
          className="bg-gray-600 h-6 w-20 rounded-sm text-amber-50"
          onClick={() => signIn("google")}
        >
          Login
        </button>
      </div>
    );

  const userDetail = session.user;

  return (
    <div className="flex">
      <span>{userDetail.name}</span>
      <Image
        src={userDetail.image ? userDetail.image : "/vercel.svg"}
        width={25}
        height={25}
        alt={userDetail.name ? userDetail.name : "No User Found"}
      />
      <button className="px-5 mx-5" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
