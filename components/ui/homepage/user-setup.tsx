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
    <section className="bg-neutral-400 dark:bg-neutral-700 fixed lg:w-1/4 md:w-1/2 w-full h-140 rounded-2xl md:left-3/8 top-1/6 flex flex-col items-center text-center shadow-2xl shadow-neutral-900 dark:shadow-neutral-700 z-50 justify-between font-sans">
      <div className="flex flex-col items-center-safe mt-5 md:text-2xl text-3xl">
        <span className="my-2">
          Name:{" "}
          {userDetail?.name ? (
            <span className="font-iceberg">{userDetail.name}</span>
          ) : (
            "WHAT THY NAME"
          )}
        </span>
        <Image
          src={userDetail?.image ? userDetail.image : "/images/acc.png"}
          width={100}
          height={100}
          alt="User Image"
          className="m-2 rounded-sm"
        />
      </div>
      <div className="md:my-5">
        <span className="text-2xl font-medium">Enter Username:</span>
        <br />
        <input
          type="text"
          name="userID"
          id="userID"
          className="outline-none border md:text-sm bg-neutral-500 dark:bg-neutral-800 border-neutral-600 rounded-lg px-4 py-2 text-xl"
          value={userName}
          onChange={(e) => setUserName(e.target.value.replace(" ", "-"))}
        />
        <br />
        <span className="md:text-xs font-mono">
          *Username should be between 3-32 characters
        </span>
        <br />
        {error && (
          <p className="text-red-600 text-sm font-semibold font-mono">
            {error}
          </p>
        )}
      </div>
      <button
        onClick={confirmUserName}
        className="py-2 px-5 my-5 bg-gray-700 dark:bg-gray-600 text-gray-100 rounded-lg hover:bg-gray-800 font-delius cursor-pointer transition-colors smoothing"
      >
        Confirm
      </button>
    </section>
  );
}
