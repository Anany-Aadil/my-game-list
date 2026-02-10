export const statusTypes = [
  { type: 1, label: "Currently Playing", value: "CURRENTLY_PLAYING" },
  { type: 2, label: "Completed", value: "COMPLETED" },
  { type: 3, label: "On-Hold", value: "ON_HOLD" },
  { type: 4, label: "Dropped", value: "DROPPED" },
  { type: 5, label: "Plan to Play", value: "PLAN_TO_PLAY" },
];

export const statusStyles: Record<string, string> = {
  CURRENTLY_PLAYING: "bg-green-600/30 hover:bg-green-600/40",
  ON_HOLD: "bg-amber-600/30 hover:bg-amber-600/40",
  COMPLETED: "bg-indigo-600/30 hover:bg-indigo-600/40",
  DROPPED: "bg-rose-600/30 hover:bg-rose-600/40",
  PLAN_TO_PLAY: "bg-teal-600/30 hover:bg-teal-600/40",
};

export const STATUS_ORDER = [
  "CURRENTLY_PLAYING",
  "COMPLETED",
  "ON_HOLD",
  "DROPPED",
  "PLAN_TO_PLAY",
];
