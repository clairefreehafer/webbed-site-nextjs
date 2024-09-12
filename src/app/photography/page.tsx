import { loveYaLikeASister, pangolin } from "@fonts";
import { css } from "@panda/css";
import Link from "next/link";
import { ReactNode } from "react";

// TODO: extract to components
const title = css({
  fontSize: "1.5rem",
});

const text = css({
  fontSize: "1.25rem",
  marginBottom: "paperLineSpacing",
});

export default function Photography() {
  return (
    <>
      <h3 className={`${loveYaLikeASister.className} ${title}`}>
        recently added
      </h3>
      <p className={`${pangolin.className} ${text}`}>
        (coming soon) photos most recently added to the site.
      </p>

      <h3 className={`${loveYaLikeASister.className} ${title}`}>
        <Link href="/photography/albums">albums</Link>
      </h3>
      <p className={`${pangolin.className} ${text}`}>
        photos grouped by location, most recent first.
      </p>

      <h3 className={`${loveYaLikeASister.className} ${title}`}>
        <Link href="/photography/collections">collections</Link>
      </h3>
      <p className={`${pangolin.className} ${text}`}>
        photos grouped by concept, subject, etc.
      </p>

      <h3 className={`${loveYaLikeASister.className} ${title}`}>curated</h3>
      <p className={`${pangolin.className} ${text}`}>
        (coming soon) smaller groups of photos selected to be displayed
        together.
      </p>

      <h3 className={`${loveYaLikeASister.className} ${title}`}>
        <Link href="/photography/technical">technical</Link>
      </h3>
      <p className={`${pangolin.className} ${text}`}>grouped by camera.</p>

      <h3 className={`${loveYaLikeASister.className} ${title}`}>map</h3>
      <p className={`${pangolin.className} ${text}`}>
        (coming soon) view geotagged photos on a map.
      </p>

      <h3 className={`${loveYaLikeASister.className} ${title}`}>random</h3>
      <p className={`${pangolin.className} ${text}`}>
        (coming soon) show a random photo
      </p>
    </>
  );
}
