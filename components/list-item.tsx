import Image from "next/image";

export default function ListItem() {
  return (
    <div className="text-gray-950 text-center box-border w-250 flex justify-evenly items-center border-gray-300 py-1 mb-0.5 border-2">
      <div className="w-10">1.</div>
      <div className="w-20">
        <Image
          src="/images/nier.png"
          width={264}
          height={352}
          alt="NieR: Automata"
        />
      </div>
      <div className="w-150 text-left">NieR: Automata</div>
      <div className="w-20">PC</div>
      <div className="w-20">10</div>
    </div>
  );
}
