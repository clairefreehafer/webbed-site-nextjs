import Link from "next/link";
import "@/sass/components/scribble-button.scss";

export type ScribbleButtonProps = {
  text: string;
  scribbleText?: string;
  href: string;
};

export default function ScribbleButton({
  text,
  scribbleText,
  href,
  className,
}: ScribbleButtonProps & { className: string }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={`scribble-button ${className}`} target="_blank">
        <div className="scribble-highlight" aria-hidden>
          {scribbleText ?? text}
        </div>
        <span className="scribble-text">{text}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={`scribble-button ${className}`}>
      <div className="scribble-highlight" aria-hidden>
        {scribbleText ?? text}
      </div>
      <span className="scribble-text">{text}</span>
    </Link>
  );
}
