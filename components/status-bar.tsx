export default function StatusBar() {
  return (
    <nav className="flex p-1.5 w-250 bg-gray-200 *:m-2 *:px-1.5 *:w-50 text-center">
      <div>All</div>
      <div>Currently Playing</div>
      <div>On-Hold</div>
      <div>Completed</div>
      <div>Dropped</div>
      <div>Plan to Play</div>
    </nav>
  );
}
