"use client";

// import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserSetup() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  //   const { data: session } = useSession();
  //   const userDetail = session?.user;

  const confirmUserName = async () => {
    const res = await fetch("api/username", {
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
    <div className="bg-gray-400 fixed w-1/4 h-2/3 rounded-2xl left-3/8 top-1/6 flex flex-col items-center text-center">
      <div></div>
      <div className="p-5">
        <span>Enter User ID: </span>
        <br />
        <input
          type="text"
          name="userID"
          id="userID"
          className="outline-none border rounded-sm p-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      <button
        onClick={confirmUserName}
        className="py-2 px-5 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-800"
      >
        Confirm
      </button>
    </div>
  );
}
