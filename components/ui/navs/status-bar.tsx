import { statusTypes } from "@/lib/status-type";

export default function StatusBar({
  onStatusClick,
  activeStatus,
}: {
  onStatusClick: any;
  activeStatus: string;
}) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNav activeStatus={activeStatus} onStatusClick={onStatusClick} />
      </div>
      <div className="block md:hidden">
        <MobileNav activeStatus={activeStatus} onStatusClick={onStatusClick} />
      </div>
    </>
  );
}

function DesktopNav({
  onStatusClick,
  activeStatus,
}: {
  onStatusClick: any;
  activeStatus: string;
}) {
  return (
    <nav className="flex w-250 bg-neutral-200 text-center justify-between hover:underline-offset-2 font-iceberg">
      <button
        onClick={() => onStatusClick("all")}
        className={`p-4 flex-1 transition-colors  ${activeStatus === "all" ? "bg-neutral-300" : "hover:bg-neutral-300"}`}
        disabled={activeStatus === "all"}
      >
        All
      </button>
      {statusTypes.map((status) => (
        <button
          key={status.type}
          onClick={() => onStatusClick(status.value)}
          disabled={activeStatus === status.value}
          className={`p-4 flex-1 w-40 transition-colors  ${activeStatus === status.value ? "bg-neutral-300" : "hover:bg-neutral-300"}`}
        >
          {status.label}
        </button>
      ))}
    </nav>
  );
}

function MobileNav({
  onStatusClick,
  activeStatus,
}: {
  onStatusClick: any;
  activeStatus: string;
}) {
  return (
    <select
      name="status-select"
      id="statuses"
      value={activeStatus}
      onChange={(e) => onStatusClick(e.target.value)}
      className="w-9/10 bg-neutral-600 text-neutral-100 rounded-lg outline-1 h-10 p-2 my-2 mx-[5%] text-center font-iceberg"
    >
      <option value="all">All Games</option>
      {statusTypes.map((status) => (
        <option value={status.value} key={status.type}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
