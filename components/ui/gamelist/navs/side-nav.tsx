import { sortItems } from "@/lib/sort-items";
import { statusTypes } from "@/lib/status-type";
import Link from "next/link";
export default function SideNav({
  onAddClick,
  usersList,
}: {
  onAddClick: React.MouseEventHandler<HTMLButtonElement>;
  usersList: any[];
}) {
  const sortedList = sortItems(usersList, "all");

  const betterList = sortedList.map((gameDetails: any, index: number) => ({
    Sno: index + 1,
    id: gameDetails.gameId,
    name: gameDetails.game.name,
    status: statusTypes.find((stat) => stat.value === gameDetails.status)
      ?.label,
    year: gameDetails.game.year,
    score: gameDetails.score,
    platforms: gameDetails.platforms.map((pf: string) => pf) ?? [],
  }));

  const exportToJSON = (listToDownload: any) => {
    const jsonString = JSON.stringify(listToDownload, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "mygamelist.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <nav className="md:w-15 w-10 flex md:flex-col fixed md:left-0 md:top-2/5 bottom-2 md:bottom-auto md:right-auto right-2 bg-neutral-200 dark:bg-neutral-950 text-center md:rounded-r-xl md:rounded-l-none rounded-3xl items-center md:aspect-auto aspect-square border-neutral-300 dark:border-neutral-800 border shadow-sm dark:shadow-md shadow-neutral-700">
      <NavButton onPress={onAddClick} classes="rounded-tr-xl">
        <i className="fa-square-plus fa-regular md:text-3xl text-xl pt-1 md:pt-0.5"></i>
      </NavButton>
      <NavButton
        onPress={() => exportToJSON(betterList)}
        classes="hidden md:block"
      >
        <i className="fa-file-export fa-solid text-3xl pl-1"></i>
      </NavButton>
      <NavButton classes="hidden md:block rounded-br-xl">
        <Link href={"/home"} className="h-full w-full">
          <i className="fa-house fa-solid text-3xl"></i>
        </Link>
      </NavButton>
    </nav>
  );
}

function NavButton({
  classes,
  children,
  onPress,
}: {
  classes?: string;
  children: React.ReactNode;
  onPress?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onPress}
      className={`w-full cursor-pointer md:aspect-square hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors ${classes}`}
    >
      {children}
    </button>
  );
}
