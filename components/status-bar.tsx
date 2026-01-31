export default function StatusBar() {
  return (
    <nav className="flex w-250 bg-gray-200 *:p-4 *:w-40 text-center justify-between *:hover:bg-gray-300 *:transition-colors ">
      <div className="">All</div>
      <div className="">Currently Playing</div>
      <div className="">On-Hold</div>
      <div className="">Completed</div>
      <div className="">Dropped</div>
      <div className="">Plan to Play</div>
    </nav>
  );
}
