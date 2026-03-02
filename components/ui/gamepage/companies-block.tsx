export default function CompanyBlock({
  companies,
}: {
  companies: Array<string>;
}) {
  return (
    <div className="text-sm">
      <span className="font-medium">Developed and Published By:</span>
      <br />
      <span className="text-md font-mono">{companies.join(", ")}</span>
    </div>
  );
}
