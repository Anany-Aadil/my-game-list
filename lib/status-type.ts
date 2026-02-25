export const statusTypes = [
  { type: 1, label: "Currently Playing", value: "CURRENTLY_PLAYING" },
  { type: 2, label: "Completed", value: "COMPLETED" },
  { type: 3, label: "On-Hold", value: "ON_HOLD" },
  { type: 4, label: "Dropped", value: "DROPPED" },
  { type: 5, label: "Plan to Play", value: "PLAN_TO_PLAY" },
];

export const statusStylesDesktop: Record<string, string> = {
  CURRENTLY_PLAYING:
    "md:bg-green-600/30 bg-green-600/90 md:hover:bg-green-600/40",
  ON_HOLD: "md:bg-amber-600/30 bg-amber-600/90 md:hover:bg-amber-600/40",
  COMPLETED: "md:bg-indigo-600/30 bg-indigo-600/90 md:hover:bg-indigo-600/40",
  DROPPED: "md:bg-rose-600/30 bg-rose-600/90 md:hover:bg-rose-600/40",
  PLAN_TO_PLAY: "md:bg-teal-600/30 bg-teal-600/90 md:hover:bg-teal-600/40",
};

export const statusStylesMobile: Record<string, string> = {
  CURRENTLY_PLAYING:
    "md:bg-transparent md:hover:bg-neutral-300/75 bg-green-600/90",
  ON_HOLD: "md:bg-transparent md:hover:bg-neutral-300/75 bg-amber-600/90",
  COMPLETED: "md:bg-transparent md:hover:bg-neutral-300/75 bg-indigo-600/90",
  DROPPED: "md:bg-transparent md:hover:bg-neutral-300/75 bg-rose-600/90",
  PLAN_TO_PLAY: "md:bg-transparent md:hover:bg-neutral-300/75 bg-teal-600/90",
};

export const STATUS_ORDER = [
  "CURRENTLY_PLAYING",
  "COMPLETED",
  "ON_HOLD",
  "DROPPED",
  "PLAN_TO_PLAY",
];
