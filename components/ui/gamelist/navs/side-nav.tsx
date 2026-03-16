import Link from "next/link";
export default function SideNav({
  onAddClick,
}: {
  onAddClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <nav className="md:w-15 w-10 flex md:flex-col fixed md:left-0 md:top-2/5 bottom-2 md:bottom-auto md:right-auto right-2 bg-neutral-200 dark:bg-neutral-950 text-center md:rounded-r-xl md:rounded-l-none rounded-3xl items-center md:aspect-auto aspect-square border-neutral-300 dark:border-neutral-800 border shadow-sm dark:shadow-md shadow-neutral-700">
      <NavButton onPress={onAddClick} classes="rounded-tr-xl">
        <i className="fa-square-plus fa-regular md:text-3xl text-xl pt-1 md:pt-0.5"></i>
      </NavButton>

      <NavButton classes="hidden md:block rounded-br-xl">
        <Link href={"/home"} className="h-full w-full">
          <i className="fa-house fa-solid text-3xl pt-3"></i>
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
  classes: string;
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
