"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserSetup() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const { data: session } = useSession();
  const userDetail = session?.user;

  const confirmUserName = async () => {
    const res = await fetch("/api/username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName }),
    });

    if (!res.ok) {
      const data = await res.json();

      setError(data.error);
      return;
    }
    window.location.reload();
  };

  return (
    <section className="bg-neutral-400 fixed w-1/4 h-2/3 rounded-2xl left-3/8 top-1/6 flex flex-col items-center text-center shadow-2xl shadow-neutral-900 z-50 font-nunito justify-between">
      <div className="flex flex-col items-center-safe mt-5 text-2xl">
        <span className="my-2">
          Name: {userDetail?.name ? userDetail.name : "Where is it?"}
        </span>
        <Image
          src={userDetail?.image ? userDetail.image : "/images/acc.png"}
          width={100}
          height={100}
          alt="User Image"
          className="m-2 rounded-sm"
        />
      </div>
      <div className="my-5">
        <span className="text-xl">Enter Username : </span>
        <br />
        <input
          type="text"
          name="userID"
          id="userID"
          className="outline-none border text-sm bg-neutral-500 rounded-lg px-4 py-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <span className="text-xs">
          *Username should be between 3-32 characters
        </span>
        {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
      </div>
      <button
        onClick={confirmUserName}
        className="py-2 px-5 my-5 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-800 font-delius cursor-pointer transition-colors smoothing"
      >
        Confirm
      </button>
    </section>
  );
}
