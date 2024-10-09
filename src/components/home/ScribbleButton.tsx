import { css, cx } from "@panda/css";
import { styled } from "@panda/jsx";
import Link from "next/link";

const button = cx(
  "group",
  css({
    aspectRatio: "88/31",
    // border: "5px outset black",
    display: "flex",
    flexDir: "column",
    justifyContent: "center",
    position: "relative",
    padding: "0.5rem 1rem",
    overflow: "hidden",
    _hover: {
      // borderStyle: "inset",
      cursor: "pointer",
    },
  })
);

const Span = styled("span", {
  base: {
    fontWeight: "bold",
    fontFamily: "caveat",
    fontSize: "2rem",
    mixBlendMode: "difference",
    textAlign: "center",
  },
});

const highlight = css({
  fontFamily: "var(--font-redacted-script)",
  fontWeight: "700",
  fontSize: "4.5rem",
  clipPath: "rect(auto 0 auto 0)",
  color: "yellow",
  left: 0,
  position: "absolute",
  overflow: "hidden",
  textAlign: "center",
  transition: "clip-path 500ms",
  whiteSpace: "nowrap",
  width: "100%",
  _groupHover: {
    clipPath: "rect(auto auto auto auto)",
  },
});

type InnerProps = {
  text: string;
  scribbleText?: string;
};

type Props = InnerProps & {
  href: string;
};

const ButtonContents = ({ scribbleText, text }: InnerProps) => (
  <>
    <div className={highlight} aria-hidden>
      {scribbleText ?? text}
    </div>
    <Span>{text}</Span>
  </>
);

export default function ScribbleButton({
  text,
  scribbleText,
  ...props
}: Props) {
  // internal links
  if (typeof props.href === "string" && props.href.startsWith("/")) {
    return (
      <Link className={button} {...props}>
        <ButtonContents text={text} scribbleText={scribbleText} />
      </Link>
    );
  }

  // external links
  return (
    <a className={button} {...props}>
      <ButtonContents text={text} scribbleText={scribbleText} />
    </a>
  );
}
