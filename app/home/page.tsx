import AuthButton from "@/components/ui/homepage/log-auth-button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="font-sans">
      <nav className="bg-neutral-300 h-20 w-3/4 mx-auto flex items-center justify-between">
        <div className="px-2 mx-2 text-4xl font-fascinate text-gray-900">
          <Link href={"/home"}>MyGameList</Link>
        </div>
        <AuthButton />
      </nav>
    </section>
  );
}
