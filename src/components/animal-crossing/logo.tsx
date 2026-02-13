export default function Logo({
  text = "claire freehafer",
  width = 350,
  height = 70,
}: {
  text?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className="svg-title"
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width,
        height,
      }}
    >
      <defs>
        <filter id="emboss">
          <feConvolveMatrix
            kernelMatrix="3 0 0
                      0 0 0
                      0 0 -3"
          />
        </filter>
        <filter id="shadow">
          <feConvolveMatrix
            kernelMatrix="-3 0 0
                    0 0 0
                    0 0 3"
          />
        </filter>
      </defs>
      <text className="svg-background" x="16" y="45">
        {text}
      </text>
      <text
        aria-hidden
        className="svg-background-shadow"
        style={{ filter: "url(#shadow)" }}
        x="16"
        y="45"
      >
        {text}
      </text>
      <text
        aria-hidden
        className="svg-emboss"
        style={{ filter: "url(#emboss)" }}
        x="16"
        y="45"
      >
        {text}
      </text>
    </svg>
  );
}
