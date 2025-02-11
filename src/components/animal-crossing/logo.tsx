export default function Logo() {
  return (
    <svg className="svg-title" viewBox="0 0 350 70">
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
        claire freehafer
      </text>
      <text
        aria-hidden
        className="svg-background-shadow"
        style={{ filter: "url(#shadow)" }}
        x="16"
        y="45"
      >
        claire freehafer
      </text>
      <text
        aria-hidden
        className="svg-emboss"
        style={{ filter: "url(#emboss)" }}
        x="16"
        y="45"
      >
        claire freehafer
      </text>
    </svg>
  );
}
