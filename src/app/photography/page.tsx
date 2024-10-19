import StyledLink from "@components/Link";
import { css, cx } from "@panda/css";
import Link from "next/link";

// TODO: extract to components
const title = css({
  fontFamily: "loveYaLikeASister",
  fontSize: "1.5rem",
});

const text = css({
  fontFamily: "pangolin",
  fontSize: "1.25rem",
  marginBottom: "paperLineSpacing",
});

const strike = css({
  textDecoration: "line-through",
  textDecorationStyle: "wavy",
  textDecorationThickness: "2px",
});

export default function Photography() {
  return (
    <>
      <h3 className={title}>
        this section is still majorly 🚧 under construction 🚧
      </h3>
      <p className={text}>
        if you would like to view my photography, please check out the following
        links:
      </p>
      <p className={text}>
        —{" "}
        <StyledLink href="https://clairefreehafer.smugmug.com">
          smugmug
        </StyledLink>
        <br />—{" "}
        <StyledLink href="https://refrakt.app/claire">refrakt</StyledLink>
        <br />—{" "}
        <StyledLink href="https://flickr.com/photos/clairefreehafer/">
          flickr
        </StyledLink>
      </p>

      <h3 className={title}>
        <StyledLink href="/photography/albums">albums</StyledLink>
      </h3>
      <p className={text}>
        photos grouped by location and/or event, most recent first.
      </p>

      <h3 className={title}>
        <StyledLink href="/photography/collections">collections</StyledLink>
      </h3>
      <p className={text}>photos grouped by concept, subject, etc.</p>

      <h3 className={title}>
        <StyledLink href="/photography/technical">technical</StyledLink>
      </h3>
      <p className={text}>grouped by camera, film, etc.</p>

      <h3 className={cx(title, strike)}>recently added</h3>
      <p className={cx(text, strike)}>
        photos most recently added to the site.
      </p>

      <h3 className={cx(title, strike)}>curated</h3>
      <p className={cx(text, strike)}>
        smaller groups of photos selected to be displayed together.
      </p>

      <h3 className={cx(title, strike)}>map</h3>
      <p className={cx(text, strike)}>view geotagged photos on a map.</p>

      <h3 className={cx(title, strike)}>random</h3>
      <p className={cx(text, strike)}>show a random photo</p>

      <h3 className={cx(title, strike)}>chronological</h3>
      <p className={cx(text, strike)}>
        view ALL photos in chronological order.
      </p>
    </>
  );
}
