export function GameListSkeleton() {
  return (
    <div className="m-auto md:w-250 w-full">
      <StatusBarSkeleton />
      <InfoBarSkeleton />
      <div className="md:block grid grid-cols-2 gap-1 relative">
        {Array.from({ length: 6 }).map((_, i) => (
          <ListItemSkeleton key={i} />
        ))}
      </div>
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

function ListItemSkeleton() {
  return (
    <div className="text-gray-950 text-center box-border md:w-250 w-full md:h-28 flex justify-evenly items-center border-gray-300 py-1 mb-0.5 border-2 relative skeleton-shimmer">
      <div className="bg-neutral-300 hidden md:block h-1/5 w-10"></div>
      <div className="bg-neutral-300 w-full aspect-3/4 md:aspect-auto md:h-full md:w-20"></div>
      <div className="bg-neutral-300 hidden md:block h-1/5 w-150"></div>
      <div className="bg-neutral-300 hidden md:block h-1/3 w-20"></div>
      <div className="bg-neutral-300 hidden md:block h-1/5 w-20"></div>
    </div>
  );
}

function StatusBarSkeleton() {
  return (
    <>
      <nav className="md:flex w-250 hidden bg-gray-200 text-center justify-between skeleton-shimmer">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-5 w-40">
            <div className="bg-neutral-400 w-20 h-5"></div>
          </div>
        ))}
      </nav>
      <nav className="w-9/10 bg-neutral-600 rounded-lg mx-[5%] mt-17 mb-2 h-10"></nav>
    </>
  );
}

function InfoBarSkeleton() {
  return (
    <div className="bg-neutral-300 text-center md:flex w-250 justify-evenly p-0.5 *:my-0.5 *:mx-2 hidden">
      <div className="h-5 bg-neutral-400 w-10"></div>
      <div className="h-5 bg-neutral-400 w-20"></div>
      <div className="h-5 bg-neutral-400 w-150 text-left"></div>
      <div className="h-5 bg-neutral-400 w-20"></div>
      <div className="h-5 bg-neutral-400 w-20"></div>
    </div>
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

export function BannerSkeleton() {
  return (
    <section className="w-full h-[75vh] bg-neutral-800 skeleton-shimmer">
      <div className="absolute top-0 left-0 h-[95vh] w-full"></div>
      <div className="w-full h-screen bg-radial from-transparent to-neutral-900/50 absolute blur"></div>
      <div className="absolute top-1/3 left-20 bg-neutral-200 w-64 h-20 text-shadow-lg font-medium blur-2xl"></div>
    </section>
  );
}

export function HomePageSkeleton() {
  return (
    <section className="w-4/5 mx-auto mt-20 flex justify-between bg-neutral-100 skeleton-shimmer">
      <main className="w-3/4 flex flex-col">
        <HeroSkeleton />
        <RowSkeleton />
        <HeroSkeleton />
      </main>
      <main className="w-64 mr-4">
        <SideListSkeleton />
        <SideListSkeleton />
      </main>
    </section>
  );
}

export function RowSkeleton() {
  return (
    <>
      <div className="w-32 h-10 mx-2 bg-neutral-900/80 blur"></div>
      <div className="w-full overflow-hidden flex mx-2 my-1 mb-4 gap-4 border-r-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="min-w-32 aspect-3/4 bg-neutral-200 border border-neutral-200"
          ></div>
        ))}
      </div>
    </>
  );
}

function HeroSkeleton() {
  return <div className="w-full h-100 bg-neutral-200 m-2"></div>;
}

function SideListSkeleton() {
  return <div className="mt-2 ml-2 bg-neutral-200 w-full h-152"></div>;
}

export function GamePageSkeleton() {
  return (
    <section className="md:mt-20 mt-15 bg-neutral-100 md:w-4/5 mx-auto">
      <div className="bg-neutral-300 w-full h-12"></div>
      <div className="md:flex w-full grid grid-cols-2">
        <div className="md:w-64 w-full border-neutral-400 md:mx-4 md:my-2 pr-2 md:border-r">
          <div className="bg-neutral-400 w-full aspect-3/4"></div>
        </div>
        <div className="w-full flex-col flex justify-around md:hidden">
          <div className="blur h-10 w-4/5 bg-neutral-700"></div>
          <div className="blur h-8 w-30 bg-neutral-700"></div>
          <div className="blur h-10 w-9/10 bg-neutral-700"></div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="border-t border-b border-neutral-400 h-10 w-full"></div>
        <div className="w-full h-36"></div>
        <div className="border-t border-b border-neutral-400 h-20 w-full"></div>
      </div>
      <div className="w-full md:h-20 h-10"></div>
      <div className="md:mx-4 mx-2">
        <div className="w-full overflow-hidden flex space-x-2 md:border-t border-neutral-400 py-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="min-w-32 aspect-3/4 rounded bg-neutral-400"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
