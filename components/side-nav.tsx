import Image from "next/image";
export default function SideNav() {
  return (
    <nav className="w-20 h-[10%] flex fixed left-0 bg-blue-200 text-center rounded-2xl items-center">
      <div className="p-1 m-auto">
        <Image
          src="/images/add-list.png"
          alt="Add to List"
          width={40}
          height={40}
        />
      </div>
    </nav>
  );
}
