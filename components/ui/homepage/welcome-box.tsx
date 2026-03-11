"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

import backgroundImage from "@/public/images/video-game-bg.jpg";

export default function WelcomeBox() {
  const { data: session } = useSession();

  const userDetail = session?.user;

  return (
    <div className="w-full h-100 border flex relative">
      <Image
        className="object-cover"
        src={backgroundImage}
        alt="bg-image"
        fill
        sizes="70vw"
      />
      <div className="top-0 bottom-0 left-0 right-0 bg-radial from-transparent to-neutral-900 absolute"></div>
      <div className="p-5 text-neutral-300 z-1 md:w-4/5 w-full text-shadow-sm text-shadow-neutral-800">
        <h1 className="md:text-5xl text-2xl font-semibold m-5 font-iceberg">
          Welcome
          {userDetail ? <> back {userDetail.name}</> : <> to MyGameList</>}
        </h1>
        <p className="m-5 font-exo text-justify font-medium md:text-xl">
          {userDetail ? "Continue building" : "Build"} your personal gaming
          library. Track what you're playing, plan what comes next, and keep a
          record of the games you've completed.
          <br />
          <br />
          {userDetail
            ? "Look up more titles and update your list as you go!"
            : "Search for a title and start your list!"}
        </p>
      </div>
      <div className="h-10 w-full md:hidden bg-linear-to-t from-neutral-200 via-neutral-200/50 to-transparent absolute -bottom-0.5"></div>
    </div>
  );
}
