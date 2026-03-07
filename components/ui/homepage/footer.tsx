export default function Footer() {
  return (
    <footer className="w-full my-5 p-6 flex flex-col md:gap-3 border-t md:border border-neutral-400">
      <div className="md:text-2xl text-lg font-exo font-semibold">
        Built With:
      </div>
      <div className="md:flex flex-wrap md:gap-4 font-mono md:items-center text-xs md:text-sm">
        <StackLink name="Next.JS" url="https://nextjs.org">
          • Javascript Framework:
        </StackLink>
        <StackLink name="Tailwind CSS" url="https://tailwindcss.com">
          • Stylesheet Framework:
        </StackLink>
        <StackLink name="IGDB API" url="https://igdb.com/api">
          • Game Database API:
        </StackLink>
        <StackLink name="Prisma" url="https://prisma.io">
          • ORM by:
        </StackLink>
        <StackLink name="Neon" url="https://neon.com">
          • Database Hosting by:
        </StackLink>
        <StackLink name="Google OAuth" url="https://developers.google.com/">
          • User Authentication by:
        </StackLink>
        <StackLink name="Vercel" url="https://vercel.com">
          • Deployment by:
        </StackLink>
      </div>
    </footer>
  );
}

function StackLink({
  children,
  url,
  name,
}: {
  children: React.ReactNode;
  url: string;
  name: string;
}) {
  return (
    <div className="text-nowrap">
      {children}
      <a
        href={url}
        target="_blank"
        className="md:py-1 hover:text-violet-900 text-indigo-800 group transition-colors smoothing font-delius relative"
        rel="noopener noreferrer"
      >
        {name}
        <span className="absolute h-0.5 w-full bg-violet-900 bottom-0 left-0 opacity-0 group-hover:opacity-90 transition-opacity smoothing"></span>
      </a>
    </div>
  );
}
