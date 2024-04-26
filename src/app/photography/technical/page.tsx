import Nav from "@/app/components/nav";
import { getAlbums } from "../smugmug";
import { Node, SmugMugKeys } from "../types";
import Header from "@/app/components/header";

export default async function Technical() {
  const { Response } = await getAlbums(SmugMugKeys.Technical);

  return (
    <>
      <Nav />
      <Header title="photography" subtitle="technical" />

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
