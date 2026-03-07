export default function StoryNSummary({
  storyline,
  summary,
}: {
  storyline: string;
  summary: string;
}) {
  return (
    <div className="py-2 w-full pr-4">
      <span className="font-medium md:font-semibold text-lg">Summary:</span>
      <p className="md:text-sm pb-2">
        {summary ? summary : "No Summary Available"}
      </p>
      {storyline ? (
        <>
          <span className="font-medium md:font-semibold text-lg pt-2">
            Storyline:
          </span>
          <p className="md:text-sm">{storyline}</p>
        </>
      ) : null}
    </div>
  );
}
