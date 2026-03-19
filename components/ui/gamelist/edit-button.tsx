export default function EditButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onPress}
      className="px-1 hover:underline cursor-pointer font-delius"
    >
      {children}
    </button>
  );
}
