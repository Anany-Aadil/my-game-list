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
    <div className="md:text-neutral-950 text-neutral-100 md:text-center text-left box-border md:w-250 w-full md:flex justify-between items-center border-neutral-300 md:py-1 md:px-0.5 mb-0.5 border-2 relative hover:shadow-lg transition-shadow shadow-neutral-300 md:aspect-auto aspect-4/3">
      <div
        className={`h-full w-2 absolute transition-colors ${statusStyles[status]} left-0 hidden md:block`}
      ></div>
      <div className="w-10 text-xs text-neutral-800 font-mono pl-1 hidden md:block">
        {sno}.
      </div>
      <div className="md:w-20">
        {cover ? (
          <Image
            src={cover}
            width={264}
            height={352}
            alt={name}
            unoptimized
            className="w-full"
          />
        ) : (
          <img
            src={"https://unsplash-assets.imgix.net/empty-states/photos.png"}
            alt="No Image found"
            width={264}
            height={352}
          />
        )}
      </div>
      <MobTitle name={name} platforms={platform} score={score} />
      <div className="w-150 text-left hidden md:block">{name}</div>
      <div
        className={`absolute md:right-1/4 md:top-2/5 right-1 top-1 text-[0.75rem] rounded-lg p-0.5 transition-colors flex ${statusStyles[status]} md:bg-transparent`}
      >
        {children}
      </div>
      <div className="w-20 text-xs font-asimovian hidden md:block">
        {platform}
      </div>
      <div className="w-20 tabular-nums tracking-tight font-exo font-medium md:block">
        {score}
      </div>
    </div>
  );
}

function MobTitle({
  name,
  platforms,
  score,
}: {
  name: string;
  platforms: string;
  score: number;
}) {
  return (
    <div className="absolute md:hidden block bg-linear-to-t from-neutral-900 to-neutral-900/75 w-full h-10 bottom-0">
      <div className="absolute left-0 top-0 font-medium">
        {name.length > 24 ? name.slice(0, 24) + "..." : name}
      </div>
      <div className="absolute left-0 bottom-0 text-xs font-asimovian">
        {platforms.length > 24 ? platforms.slice(0, 24) + "..." : platforms}
      </div>
      <div className="absolute right-0 bottom-0 tabular-nums tracking-tight font-exo font-medium">
        {score}
      </div>
    </div>
  );
}
