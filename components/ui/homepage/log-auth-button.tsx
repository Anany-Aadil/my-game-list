"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session } = useSession();

  const logOut = () => {
    const confirm = window.confirm("Logout?");
    if (!confirm) return;
    signOut();
  };

  const userDetail = session?.user;

  return (
    <div className="flex justify-between items-center-safe text-neutral-100 md:mx-5">
      <div className="font-nunito">
        <span className="text-sm mx-1.5">
          {userDetail?.name ? userDetail.name : "Welcome"}
        </span>
        <span className="text-sm mx-1.5 hidden md:inline">
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
        <LogButton onPress={() => logOut()}>
          <span className="hidden md:inline">Logout</span>
          <span className="md:hidden">
            <i className="fa-user-slash fa-solid"></i>
          </span>
        </LogButton>
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
  onPress: React.MouseEventHandler;
}) {
  return (
    <button
      onClick={onPress}
      className="bg-neutral-600 h-6 md:w-20 aspect-square md:aspect-auto rounded-sm text-neutral-50 mx-5 text-sm hover:bg-neutral-400 transition-colors hover:text-neutral-900 font-delius cursor-pointer"
    >
      {children}
    </button>
  );
}
