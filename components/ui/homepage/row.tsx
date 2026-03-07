import Thumbnail from "./thumbnail";

export default function Row({
  category,
  title,
}: {
  category: any[];
  title: string;
}) {
  return (
    <>
      <div className="font-bold mt-4 text-xl font-iceberg">{title}</div>
      <div className="flex overflow-x-scroll max-w-full custom-horizontal-scroll mb-4 gap-4 md:border-r-2">
        {category.map((game) => (
          <Thumbnail game={game} key={game.id} />
        ))}
      </div>
    </>
  );
}
