import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const albums = await prisma.album.findMany();

  return albums.map((album) => ({
    album: album.name.replaceAll(" ", "-"),
  }));
}

export const dynamicParams = false;

async function getAlbumPhotos(albumName: string) {
  const photos = await prisma.photo.findMany({
    where: {
      albumName,
    },
    orderBy: {
      captureDate: "asc"
    },
    select: {
      id: true,
      url: true,
    }
  });

  return photos;
}

export default async function Page({ params }: { params: { album: string }}) {
  const albumName = params.album.replaceAll("-", " ");
  const photos = await getAlbumPhotos(albumName);

  return (
    <>
      <h3>{albumName}</h3>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.url?.replaceAll("#size#", "L")} />
        </div>
      ))}
    </>
  );
}
