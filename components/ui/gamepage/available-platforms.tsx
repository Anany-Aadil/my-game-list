export default function AvailPlatforms({
  platforms,
}: {
  platforms: Array<string>;
}) {
  return (
    <div className="border-b border-t md:border-b-0 md:mt-5 border-neutral-400 py-2 text-lg max-w-[97%]">
      <div className="p-2 font-medium">Available Platforms :</div>
      <div className="overflow-x-scroll custom-horizontal-scroll flex">
        {platforms.map((pf: string) => (
          <div
            key={pf}
            className="border border-emerald-800 mx-2 px-1 rounded-sm text-sm text-nowrap text-emerald-800 font-nunito dark:text-emerald-500"
          >
            {pf}
          </div>
        ))}
      </div>
    </div>
  );
}
