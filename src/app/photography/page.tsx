import { loveYaLikeASister, pangolin } from "@fonts";
import Link from "next/link";
import { ReactNode } from "react";

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className={`${loveYaLikeASister.className} leading-paper text-2xl`}>
    {children}
  </h3>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className={`${pangolin.className} leading-paper mb-line-spacing text-xl`}>
    {children}
  </p>
);

const StyledLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link href={href} className="underline hover:no-underline">
    {children}
  </Link>
);

export default async function Photography() {
  return (
    <>
      <H3>recently added</H3>
      <P>(coming soon) photos most recently added to the site.</P>

      <H3>
        <StyledLink href="/photography/albums">albums</StyledLink>
      </H3>
      <P>photos grouped by location, most recent first.</P>

      <H3>
        <StyledLink href="/photography/collections">collections</StyledLink>
      </H3>
      <P>photos grouped by concept, subject, etc.</P>

      <H3>curated</H3>
      <P>
        (coming soon) smaller groups of photos selected to be displayed
        together.
      </P>

      <H3>
        <StyledLink href="/photography/technical">technical</StyledLink>
      </H3>
      <P>grouped by camera.</P>

      <H3>map</H3>
      <P>(coming soon) view geotagged photos on a map.</P>

      <H3>random</H3>
      <P>(coming soon) show a random photo</P>
    </>
  );
}
