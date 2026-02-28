import Link from "next/link";
export default function SideNav({ onAddClick }: { onAddClick: any }) {
  return (
    <nav className="md:w-15 w-10 flex md:flex-col fixed md:left-0 md:top-2/5 bottom-2 md:bottom-auto md:right-auto right-2 bg-neutral-200 text-center md:rounded-r-xl md:rounded-l-none rounded-3xl items-center md:aspect-auto aspect-square border-neutral-300 border shadow-sm shadow-neutral-500">
      <button
        onClick={onAddClick}
        className="w-full cursor-pointer md:aspect-square rounded-tr-xl hover:bg-neutral-300 transition-colors"
      >
        <i className="fa-square-plus fa-regular md:text-3xl text-xl pt-1 md:pt-0.5"></i>
      </button>
      <div className="w-full cursor-pointer md:aspect-square hidden md:block hover:bg-neutral-300 rounded-br-xl transition-colors">
        <Link href={"/home"} className="h-full w-full">
          <i className="fa-house fa-solid text-3xl pt-3"></i>
        </Link>
      </div>
    </nav>
  );
}
