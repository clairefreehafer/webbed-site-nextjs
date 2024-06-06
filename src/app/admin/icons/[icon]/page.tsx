import { getIconData } from "@utils/prisma/icon";
import UpdateIconForm from "./form";

export default async function Page({ params }: { params: { icon: string } }) {
  const iconData = await getIconData(parseInt(params.icon));

  return <UpdateIconForm iconData={iconData} />;
}
