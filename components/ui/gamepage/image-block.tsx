import Image from "next/image";

export default function ImageBlock({
  cover,
  alt,
}: {
  cover: string;
  alt: string;
}) {
  return (
    <div className="md:mr-2">
      <Image src={cover} alt={alt} width={264} height={352} unoptimized />
    </div>
  );
}
