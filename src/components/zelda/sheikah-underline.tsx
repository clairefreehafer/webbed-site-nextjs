import "@/sass/zelda/sheikah-underline.scss";

export default function SheikahUnderline({
  children,
  text,
  textSize,
  gap,
}: React.PropsWithChildren<{
  text: string;
  textSize: React.CSSProperties["fontSize"];
  gap: React.CSSProperties["gap"];
}>) {
  return (
    <div
      className="sheikah-underline-container"
      style={{
        gap,
      }}
    >
      {children}
      <div
        className="sheikah-underline"
        aria-hidden
        style={{
          fontSize: textSize,
        }}
      >
        {text}
      </div>
    </div>
  );
}
