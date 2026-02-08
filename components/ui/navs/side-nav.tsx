import Image from "next/image";
import addIcon from "@/public/square-plus-regular-full.svg";
import homeIcon from "@/public/house-solid-full.svg";
import Link from "next/link";
export default function SideNav({ onClick }: { onClick: any }) {
  return (
    <nav className="w-15 flex flex-col fixed left-0 top-2/5 bg-neutral-200 text-center rounded-r-xl items-center border-neutral-300">
      <button
        onClick={onClick}
        className="w-full cursor-pointer aspect-square px-3 rounded-tr-xl hover:bg-neutral-300 transition-colors"
      >
        <Image src={addIcon} alt="Add to List" width={35} height={35} />
      </button>
      <div className="w-full aspect-square text-sm hover:bg-neutral-300 rounded-br-xl transition-colors">
        <Link href={"/home"} className="h-full w-full p-3 block">
          <Image src={homeIcon} alt="Go to Home" width={35} height={35} />
        </Link>
      </div>
    </nav>
  );
}
