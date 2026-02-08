import Image from "next/image";
import Link from "next/link";
import backgroundImage from "../public/images/video-game-bg.jpg";

export default function Home() {
  return (
    <section className="font-sans text-4xl">
      <Image
        src={backgroundImage}
        alt="background Image"
        fill
        className="opacity-50"
        objectFit="cover"
      />
      <div className="fixed top-1/3 left-1/3 text-center bg-neutral-300 p-10 rounded-2xl">
        <div className="py-5">
          Welcome to <span className="font-fascinate">My Game List</span>
        </div>
        <Link href={"/home"}>
          <div className="bg-neutral-500 my-6 py-2 rounded-2xl hover:bg-neutral-600">
            Go to Home
          </div>
        </Link>
      </div>
    </section>
  );
}
