"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="cursor-pointer text-neutral-100"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        console.log(theme);
      }}
    >
      <i
        className={`${theme === "dark" ? "fa-sun" : "fa-moon"} fa-solid transition-all smoothing`}
      ></i>
    </button>
  );
}
