import Nav from "../../components/nav";
import { getAlbums } from "../smugmug";
import { Node, SmugMugKeys } from "../types";
import Header from "../../components/header";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function Explore() {
  const prisma = new PrismaClient();
  const albums = await prisma.album.findMany();

  return (
    <>
      {/* <Nav /> */}
      <Header title="photography" subtitle="explore" />

      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <h3><Link href={`/photography/albums/${album.name.replaceAll(" ", "-")}`}>{album.name}</Link></h3>
          </li>
        ))}
      </ul>
    </>
  )
}
