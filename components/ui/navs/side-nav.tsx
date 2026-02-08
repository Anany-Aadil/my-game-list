import Image from "next/image";
export default function SideNav({ onClick }: { onClick: any }) {
  return (
    <nav className="w-15 h-15 flex flex-col fixed left-0 top-1/2 bg-neutral-200 text-center rounded-r-xl items-center transition-colors hover:bg-neutral-300 border border-neutral-300">
      <button onClick={onClick} className="w-full h-full pl-3.5">
        <Image
          src="/images/add-list.png"
          alt="Add to List"
          width={35}
          height={35}
        />
      </button>
    </nav>
  );
}
