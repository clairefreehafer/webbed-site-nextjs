import Nav from "../../components/nav";
import { getAlbums } from "../smugmug";
import { Node, SmugMugKeys } from "../types";
import Header from "../../components/header";

export default async function Explore() {
  const { Response } = await getAlbums(SmugMugKeys.Explore);

  return (
    <>
      <Nav />
      <Header title="photography" subtitle="explore" />

      <ul>
        {Response.Node.map((node: Node) => (
          <li key={node.NodeID}>
            <h3>{node.Name}</h3>
          </li>
        ))}
      </ul>
    </>
  )
}
