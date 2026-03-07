export default function YearORe({ year }: { year: number }) {
  return (
    <div className="text-md font-medium md:font-normal font-mono">
      Year of Release:{" "}
      <span className="font-asimovian text-lg md:text-md">
        {year ? year : "TBA"}
      </span>
    </div>
  );
}
