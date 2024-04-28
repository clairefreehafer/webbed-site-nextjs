import { PrismaClient } from "@prisma/client";

export async function generateStaticParams() {
  const prisma = new PrismaClient();
  const albums = await prisma.album.findMany();
 
  return albums.map((album) => ({
    album: album.name,
  }));
}

export const dynamicParams = false;

async function getAlbumPhotos(albumName: string) {
  const prisma = new PrismaClient();
  const photos = await prisma.photo.findMany({
    where: {
      album
    }
  })
}

export default function Page({ params }: { params: { album: string }[] }) {
  const getAlbumPhotos = await
  return JSON.stringify(params);
}
