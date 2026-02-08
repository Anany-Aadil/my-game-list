import { statusTypes } from "@/lib/status-type";

export default function StatusBar({
  onStatusClick,
  activeStatus,
}: {
  onStatusClick: any;
  activeStatus: string;
}) {
  return (
    <nav className="flex w-250 bg-gray-200 text-center justify-between">
      <button
        onClick={() => onStatusClick("all")}
        className={`p-4 w-40 transition-colors hover:bg-gray-300 ${activeStatus === "all" ? "bg-gray-300" : ""}`}
        disabled={activeStatus === "all"}
      >
        All
      </button>
      {statusTypes.map((status) => (
        <button
          key={status.type}
          onClick={() => onStatusClick(status.value)}
          disabled={activeStatus === status.value}
          className={`p-4 w-40 transition-colors hover:bg-gray-300 ${activeStatus === status.value ? "bg-gray-300" : ""}`}
        >
          {status.label}
        </button>
      ))}
    </nav>
  );
}
