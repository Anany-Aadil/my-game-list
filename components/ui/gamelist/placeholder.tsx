export default function Placeholder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center box-border md:w-250 w-full flex justify-center items-center border-gray-300 dark:border-neutral-800 py-1 mb-0.5 border-2 md:static absolute">
      {children}
    </div>
  );
}
