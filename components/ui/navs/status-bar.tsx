import { statusTypes } from "@/lib/status-type";

export default function StatusBar({
  onStatusClick,
  activeStatus,
}: {
  onStatusClick: any;
  activeStatus: string;
}) {
  return (
    <nav className="flex w-250 bg-neutral-200 text-center justify-between hover:underline-offset-2">
      <button
        onClick={() => onStatusClick("all")}
        className={`p-4 flex-1 transition-colors hover:bg-neutral-300 ${activeStatus === "all" ? "bg-neutral-300" : ""}`}
        disabled={activeStatus === "all"}
      >
        All
      </button>
      {statusTypes.map((status) => (
        <button
          key={status.type}
          onClick={() => onStatusClick(status.value)}
          disabled={activeStatus === status.value}
          className={`p-4 flex-1 w-40 transition-colors hover:bg-neutral-300 ${activeStatus === status.value ? "bg-neutral-300" : ""}`}
        >
          {status.label}
        </button>
      ))}
    </nav>
  );
}
