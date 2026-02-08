export default function EditButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: any;
}) {
  return (
    <button onClick={onPress} className="px-1 hover:underline">
      {children}
    </button>
  );
}
