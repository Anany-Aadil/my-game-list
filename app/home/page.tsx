import AuthButton from "@/components/log-auth-button";

export default function Home() {
  return (
    <section className="font-sans">
      <nav className="bg-blue-300 h-20 w-3/4 mx-auto flex items-center justify-between">
        <div className="px-2 mx-2 text-4xl font-fascinate text-gray-900">
          MyGameList
        </div>
        <AuthButton />
      </nav>
    </section>
  );
}
