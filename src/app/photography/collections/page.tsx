import Nav from "../../components/nav";
import { getPages } from "../smugmug";
import { Node, SmugMugKeys } from "../types";
import Header from "../../components/header";
import CoverImage from "../../components/cover-image/cover-image";
import styles from "./page.module.css";

export default async function Collections() {
  const { Response, Expansions } = await getPages(SmugMugKeys.Collections);

  function getImageUrl(node: Node) {
    const highlightImageKey = node.Uris.HighlightImage.Uri;
    const sizesKey = Expansions[highlightImageKey].Image.Uris.ImageSizes.Uri;

    return Expansions[sizesKey].ImageSizes.LargeImageUrl;
  };

  return (
    <>
      <Nav />
      <Header title="photography" subtitle="collections" />

      <ul className={styles.ul}>
        {Response.Node.map((node: Node) => (
          <li key={node.NodeID}>
            <CoverImage src={getImageUrl(node)} aspectRatio="1 / 1" />
            <h3>{node.Name}</h3>
          </li>
        ))}
      </ul>
    </>
  )
}