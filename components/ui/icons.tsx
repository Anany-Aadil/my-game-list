export function SearchIcon({
  fillColor,
  className,
}: {
  fillColor: string;
  className: string;
}) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={fillColor}
        viewBox="0 0 16 16"
        className={className}
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
    </>
  );
}

export function CloseIcon({
  fillColor,
  className,
}: {
  fillColor: string;
  className: string;
}) {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill={fillColor}
      >
        <title>Close-Circle</title>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Close-Circle">
            <rect
              id="Rectangle"
              fillRule="nonzero"
              x="0"
              y="0"
              width="24"
              height="24"
            ></rect>
            <circle
              id="Oval"
              stroke={fillColor}
              strokeWidth="2"
              strokeLinecap="round"
              cx="12"
              cy="12"
              r="9"
            ></circle>
            <line
              x1="14.1213"
              y1="9.87866"
              x2="9.8787"
              y2="14.1213"
              id="Path"
              stroke={fillColor}
              strokeWidth="2"
              strokeLinecap="round"
            ></line>
            <line
              x1="9.87866"
              y1="9.87866"
              x2="14.1213"
              y2="14.1213"
              id="Path"
              stroke={fillColor}
              strokeWidth="2"
              strokeLinecap="round"
            ></line>
          </g>
        </g>
      </svg>
    </>
  );
}
