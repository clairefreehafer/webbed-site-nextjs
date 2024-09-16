import { css, cx } from "@panda/css";
import { styled } from "@panda/jsx";
import Link from "next/link";

const button = cx(
  "group",
  css({
    aspectRatio: "3/1",
    border: "5px outset black",
    display: "flex",
    flexDir: "column",
    justifyContent: "center",
    position: "relative",
    padding: "0.5rem 1rem",
    overflow: "hidden",
    _hover: {
      borderStyle: "inset",
      cursor: "pointer",
    },
  })
);

// TODO: pick fun font
const Span = styled("span", {
  base: {
    fontWeight: "bold",
    mixBlendMode: "difference",
    textAlign: "center",
  },
});

const highlight = css({
  fontFamily: "var(--font-redacted-script)",
  fontWeight: "700",
  fontSize: "4rem",
  color: "yellow",
  left: 0,
  position: "absolute",
  overflow: "hidden",
  textIndent: "10px",
  width: "0%",
  whiteSpace: "nowrap",
  _groupHover: {
    animation: "writeIn 250ms linear",
    animationFillMode: "forwards",
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
