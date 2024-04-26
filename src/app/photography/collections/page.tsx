import Nav from "@/app/components/nav";
import { getPages } from "../smugmug";
import { Node, SmugMugKeys } from "../types";
import Header from "@/app/components/header";

export default async function Collections() {
  const { Response } = await getPages(SmugMugKeys.Collections);

  return (
    <>
      <Nav />
      <Header title="photography" subtitle="collections" />

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