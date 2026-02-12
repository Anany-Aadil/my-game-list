import Image from "next/image";

export default function Banner({ currentGame }: { currentGame: any }) {
  return (
    <section className="w-full h-[75vh]">
      {currentGame && (
        <>
          <div className="absolute top-0 left-0 h-[95vh] w-full">
            <Image
              src={currentGame?.background_image}
              alt={currentGame?.name}
              fill
              className="opacity-75 object-cover"
              loading="eager"
            />
          </div>
          <div className="w-full h-screen bg-radial from-transparent to-neutral-900/50 absolute blur"></div>
          <div className="absolute top-1/3 left-20 text-neutral-100 text-7xl text-shadow-lg font-medium">
            {currentGame?.name}
          </div>
        </>
      )}
    </section>
  );
}
