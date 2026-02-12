import Thumbnail from "./thumbnail";

export default function Row({
  category,
  title,
}: {
  category: any[];
  title: string;
}) {
  return (
    <main className="text-neutral-100 relative ml-10 pl-10 my-5 space-y-2">
      <h1 className="text-2xl font-iceberg pl-2">{title}</h1>
      <div className="flex overflow-x-scroll custom-horizontal-scroll items-center space-x-2">
        {category.map((game) => (
          <Thumbnail gameDetail={game} key={game.id} />
        ))}
      </div>
    </main>
  );
}
