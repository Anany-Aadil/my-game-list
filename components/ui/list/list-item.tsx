import Image from "next/image";
import { statusStyles } from "@/lib/status-type";

export default function ListItem({
  sno,
  name,
  cover,
  platform,
  children,
  score,
  status,
}: {
  sno: number;
  name: string;
  cover: string;
  platform: string;
  children: React.ReactNode;
  score: number;
  status: string;
}) {
  return (
    <div className="text-neutral-950 text-center box-border w-250 flex justify-between items-center border-neutral-300 py-1 px-0.5 mb-0.5 border-2 relative hover:shadow-lg transition-shadow shadow-neutral-300">
      <div
        className={`h-full w-2 absolute ${statusStyles[status]} left-0`}
      ></div>
      <div className="w-10 text-xs text-neutral-800">{sno}.</div>
      <div className="w-20">
        {cover ? (
          <Image src={cover} width={264} height={352} alt={name} unoptimized />
        ) : (
          <img
            src={"https://unsplash-assets.imgix.net/empty-states/photos.png"}
            alt="No Image found"
            width={264}
            height={352}
          />
        )}
      </div>
      <div className="w-150 text-left">{name}</div>
      <div className="absolute right-1/4 top-2/5 text-[0.75rem] rounded-lg hover:bg-neutral-300 p-0.5 transition-colors">
        {children}
      </div>
      <div className="w-20 text-sm">{platform}</div>
      <div className="w-20">{score}</div>
    </div>
  );
}
