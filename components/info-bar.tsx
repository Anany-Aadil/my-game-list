export default function InfoBar() {
  return (
    <div className="bg-gray-300 text-center flex w-250 justify-evenly p-0.5 *:my-0.5 *:mx-2">
      <div className="w-10">#</div>
      <div className="w-20">Image</div>
      <div className="w-150 text-left">Game Title</div>
      <div className="w-20">Platform</div>
      <div className="w-20">Score</div>
    </div>
  );
}
