import { getAlbums } from "../smugmug";
import { Node, SmugMugKeys } from "../types";

export default async function Technical() {
  const { Response } = await getAlbums(SmugMugKeys.Technical);

  return (
    <ul>
      {Response.Node.map((node: Node) => (
        <li key={node.NodeID}>
          <h3>{node.Name}</h3>
        </li>
      ))}
    </ul>
  )
}
