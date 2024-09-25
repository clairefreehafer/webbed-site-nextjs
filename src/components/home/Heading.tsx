import GradientBorder, {
  GradientBorderProps,
} from "@components/experimental/GradientBorder";
import { cva } from "@panda/css";
import { analglyphText, jaggedBorder } from "@panda/patterns";

const heading = cva({
  base: analglyphText.raw({
    shadowOffset: "0.05rem",

    fontFamily: "var(--font-ribeye-marrow)",
    position: "relative",
    textAlign: "center",
    width: "100%",
    zIndex: 2,
  }),
  variants: {
    element: {
      h1: {
        fontSize: "4rem",
        marginBottom: "4rem",
      },
      h2: {
        fontSize: "3rem",
        marginBottom: "3rem",
      },
      h3: {
        fontSize: "2rem",
      },
    },
  },
});

const underline = cva({
  base: analglyphText.raw({
    shadowOffset: "0.1rem",

    fontFamily: "redactedScript",
    position: "relative",
    textAlign: "center",
    textWrap: "nowrap",
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
      h3: {
        fontSize: "3.3rem",
        margin: "-2.7rem 1.5rem 0",
      },
    },
  },
});

type Props = {
  element: "h1" | "h2" | "h3";
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

const gradientConfig: Record<
  Props["element"],
  Pick<GradientBorderProps, "borderSize" | "baseFrequency">
> = {
  h1: {
    borderSize: "10rem",
  },
  h2: {
    borderSize: "5rem",
    baseFrequency: "0.01",
  },
  h3: {
    borderSize: "3rem",
    baseFrequency: "0.1",
  },
};

// TODO: BG stripes?
export default function HomeHeading({ children, element }: Props) {
  return (
    <GradientBorder
      noisy
      invert
      gradientColor="black"
      backgroundColor="white"
      {...gradientConfig[element]}
    >
      <Heading element={element}>{children}</Heading>
    </GradientBorder>
  );
}
