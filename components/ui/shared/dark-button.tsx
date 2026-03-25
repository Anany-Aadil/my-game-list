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

  const sharedClasses =
    "absolute fa-solid transition-all smoothing top-0 left-0 right-0 bottom-0";

  return (
    <div
      className="cursor-pointer relative w-full h-full md:p-2.5 p-1.5"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      <i
        className={`${sharedClasses} fa-sun opacity-100 dark:opacity-0 rotate-0 scale-100 dark:scale-50 dark:rotate-90`}
      ></i>
      <i
        className={`${sharedClasses} fa-moon dark:opacity-100 opacity-0 dark:rotate-0 dark:scale-100 scale-50 -rotate-90`}
      ></i>
    </div>
  );
}
