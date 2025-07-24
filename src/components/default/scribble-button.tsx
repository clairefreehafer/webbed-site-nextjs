import Link from "next/link";

export type ScribbleButtonProps = {
  text: string;
  scribbleText?: string;
  href: string;
};

export default function ScribbleButton({
  text,
  scribbleText,
  href,
}: ScribbleButtonProps) {
  return (
    <Link href={href} className="scribble-button">
      <div className="scribble-highlight" aria-hidden>
        {scribbleText ?? text}
      </div>
      <span className="scribble-text">{text}</span>
    </Link>
  );
}
