import { cva } from "@panda/css";
import { analglyphText, jaggedBorder } from "@panda/patterns";

const heading = cva({
  base: analglyphText.raw({
    shadowOffset: "0.05rem",

    fontFamily: "var(--font-ribeye-marrow)",
    position: "relative",
    zIndex: 2,
  }),
  variants: {
    element: {
      h1: {
        fontSize: "4rem",
        margin: "1rem 1rem 4rem",
      },
      h2: {
        fontSize: "3rem",
        margin: "0 0.5rem 3rem",
      },
    },
  },
});

const underline = cva({
  base: analglyphText.raw({
    shadowOffset: "0.1rem",

    fontFamily: "var(--font-redacted-script)",
    position: "relative",
    textAlign: "center",
    zIndex: 2,
  }),
  variants: {
    element: {
      h1: {
        fontSize: "4.3rem",
        margin: "-7.5rem 1.5rem 0",
      },
      h2: {
        fontSize: "4rem",
        margin: "-6rem 1.5rem 0",
      },
    },
  },
});

type Props = {
  element: "h1" | "h2";
  children: React.ReactNode;
};

const Heading = ({ element: Element, children }: Props) => {
  return (
    <>
      <Element className={heading({ element: Element })}>{children}</Element>
      <p className={underline({ element: Element })} aria-hidden>
        {children}
      </p>
    </>
  );
};

// TODO: BG stripes?
export default function HomeHeading({ children, element }: Props) {
  return (
    <>
      <div
        className={jaggedBorder({
          side: "bottom",
          jagSize: 30,
          alignItems: "center",
          boxShadow: "inset 0rem 1rem 1rem -1rem black",
          display: "flex",
          flexDir: "column",
          justifyContent: "center",
          width: "100%",
        })}
      >
        <Heading element={element}>{children}</Heading>
      </div>
    </>
  );
}
