import { getAlbumSection } from "@utils/prisma/album";
import { getRootSection } from "@utils/section";

export async function GET(
  _request: Request,
  { params }: { params: { albumName: string } }
) {
  const { albumName } = params;

  console.log(`🌐 fetching root section for album "${albumName}"...`);

  try {
    const sectionName = await getAlbumSection(albumName);
    const rootSection = await getRootSection(sectionName);

    if (!rootSection) {
      throw new Error(`could not find root section for album "${albumName}".`);
    }

    console.log(`👍 found \`rootSection: "${rootSection}"\` for album "${albumName}".`);

    return Response.json({ rootSection });
  } catch (error) {
    console.error(`❌ ${error}`);
    console.error(` > albumName = "${albumName}";`);
    return new Response(error as string, { status: 404 })
  }
}