import { PrismaClient } from "@prisma/client";
import { displayName, slugName } from "@utils/albums";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const albums = await prisma.album.findMany({
    where: {
      section: { has: "photography" },
    }
  });

  return albums.map((album) => ({
    section: album.section[1],
    album: slugName(album.name),
  }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: { page: string }}) {
  const albumName = displayName(params.page);
  const album = await prisma.album.findUnique({
    where: { name: albumName },
    include: { photos: true }
  });

  if (!album) {
    return `❌ album ${albumName} not found`;
  }

  let photos = album.photos;

  if (album.type === "tag") {
    const tag = await prisma.tag.findUnique({
      where: { tag: albumName },
      include: { photos: true }
    });

    if (!tag) {
      return `❌ tag ${albumName} not found`;
    }

    photos = tag.photos;
  }

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
