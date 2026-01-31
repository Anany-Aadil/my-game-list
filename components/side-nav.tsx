import Image from "next/image";
export default function SideNav({ onClick }: { onClick: any }) {
  return (
    <nav className="w-15 h-15 flex flex-col fixed left-0 bg-blue-200 text-center rounded-2xl items-center">
      <button
        onClick={onClick}
        className="hover:bg-blue-300 w-full rounded-2xl h-full pl-3.5 transition-colors"
      >
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
