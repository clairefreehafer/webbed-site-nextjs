import Link from "next/link";
import "@/sass/default/scribble-button.scss";

export type ScribbleLinkProps = {
  text: string;
  scribbleText?: string;
  href: string;
};

export default function ScribbleLink({
  href,
  text,
  scribbleText,
  className,
}: ScribbleLinkProps & { className?: string }) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={`scribble-link ${className}`}
        target="_blank"
        key={href}
      >
        <div className="scribble-highlight" aria-hidden>
          {scribbleText ?? text}
        </div>
        <span className="scribble-text">{text}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={`scribble-link ${className}`} key={href}>
      <div className="scribble-highlight" aria-hidden>
        {scribbleText ?? text}
      </div>
      <span className="scribble-text">{text}</span>
    </Link>
  );
}
