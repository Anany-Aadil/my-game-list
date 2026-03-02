export default function GenreBlock({ genres }: { genres: Array<string> }) {
  return (
    <div className="border-b border-t md:border-0 border-neutral-600 p-2 text-lg flex items-center overflow-x-scroll custom-horizontal-scroll">
      {genres.map((gn: string) => (
        <div
          key={gn}
          className="border mx-2 px-1 rounded-sm text-sm text-gray-700 font-nunito text-nowrap"
        >
          {gn}
        </div>
      ))}
    </div>
  );
}
