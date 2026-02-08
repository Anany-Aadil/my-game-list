function ListItemSkeleton() {
  return (
    <div className="text-gray-950 text-center box-border w-250 h-28 flex justify-evenly items-center border-gray-300 py-1 mb-0.5 border-2 relative skeleton-shimmer">
      <div className="bg-neutral-300 h-1/5 w-10"></div>
      <div className="bg-neutral-300 h-full w-20"></div>
      <div className="bg-neutral-300 h-1/5 w-150"></div>
      <div className="bg-neutral-300 h-1/3 w-20"></div>
      <div className="bg-neutral-300 h-1/5 w-20"></div>
    </div>
  );
}

export function GameListSkeleton() {
  return (
    <div className="m-auto w-250">
      <StatusBarSkeleton />
      <InfoBarSkeleton />
      {Array.from({ length: 5 }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  );
}

function StatusBarSkeleton() {
  return (
    <nav className="flex w-250 bg-gray-200 text-center justify-between skeleton-shimmer">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-5 w-40">
          <div className="bg-neutral-400 w-20 h-5"></div>
        </div>
      ))}
    </nav>
  );
}

function InfoBarSkeleton() {
  return (
    <div className="bg-neutral-300 text-center flex w-250 justify-evenly p-0.5 *:my-0.5 *:mx-2">
      <div className="h-5 bg-neutral-400 w-10"></div>
      <div className="h-5 bg-neutral-400 w-20"></div>
      <div className="h-5 bg-neutral-400 w-150 text-left"></div>
      <div className="h-5 bg-neutral-400 w-20"></div>
      <div className="h-5 bg-neutral-400 w-20"></div>
    </div>
  );
}

export function SearchItemsSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <SearchItemSkeleton key={i} idx={i} />
      ))}
    </>
  );
}

function SearchItemSkeleton({ idx }: { idx: number }) {
  return (
    <div
      className={`flex skeleton-shimmer relative w-9/10 mx-auto justify-between items-center p-2 h-10.5 border-b border-neutral-700 ${idx % 2 === 0 ? "bg-neutral-800" : "bg-neutral-900"}`}
    >
      <div className="px-1 h-2/3 w-1/2 bg-neutral-400"></div>
      <div className="w-1/5 flex h-2/3 justify-between items-center">
        <div className="h-full w-10 bg-neutral-400 rounded-lg"></div>
        <div className="h-full p-2 w-10 bg-blue-600 rounded-lg"></div>
      </div>
    </div>
  );
}
