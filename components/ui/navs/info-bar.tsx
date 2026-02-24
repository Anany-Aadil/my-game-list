export default function InfoBar() {
  return (
    <div className="bg-neutral-300 text-center md:flex w-250 justify-between px-0.5 pt-1.5 pb-0.5 font-nunito text-sm font-bold hidden">
      <div className="w-10">#</div>
      <div className="w-20">Image</div>
      <div className="w-150 text-left">Game Title</div>
      <div className="w-20">Platform</div>
      <div className="w-20">Score</div>
    </div>
  );
}
