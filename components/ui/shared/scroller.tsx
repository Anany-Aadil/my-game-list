"use client";

import { RefObject, useState } from "react";

export default function Scroller({
  children,
  rowRef,
  customClass,
}: {
  children: React.ReactNode;
  rowRef: RefObject<HTMLDivElement | null>;
  customClass?: string;
}) {
  // const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleScroll = (dir: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollToBit =
        dir == "left"
          ? scrollLeft - Math.round(clientWidth / 1.5)
          : scrollLeft + Math.round(clientWidth / 1.5);

      rowRef.current.scrollTo({ left: scrollToBit, behavior: "smooth" });
    }
  };
  return (
    <>
      <Arrows
        className={`-left-3 ${customClass} hidden ${isMoved && "md:block"}`}
        scroller={() => handleScroll("left")}
        iconClasses="fa-angle-left"
      />
      {children}
      <Arrows
        className={`-right-3 ${customClass} md:block`}
        scroller={() => handleScroll("right")}
        iconClasses="fa-angle-right"
      />
    </>
  );
}

export function Arrows({
  scroller,
  iconClasses,
  className,
}: {
  scroller: React.MouseEventHandler<HTMLButtonElement>;
  iconClasses: string;
  className: string;
}) {
  return (
    <button className={`absolute hidden ${className} z-1`} onClick={scroller}>
      <i className={`${iconClasses} fa-solid chev-ico smoothing`}></i>
    </button>
  );
}
