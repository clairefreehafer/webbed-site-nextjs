import AdminTable from "@components/admin/table";
import Icon from "@components/icon";
import { getIconsWithAlbums } from "@utils/prisma/icon"
import Link from "next/link";

export default async function Icons() {
  const icons = await getIconsWithAlbums();

  return (
    <>
      <p>
        <Link href="/admin/icons/new">add icon</Link>
      </p>
      <AdminTable>
        <thead>
          <tr>
            <th>image</th>
            <th>album(s)</th>
          </tr>
        </thead>
        <tbody>
          {icons.map((icon) => (
            <tr key={icon.id}>
              <td>
                <Icon icon={icon} height={3} />
              </td>
              <td>
                {icon.albums.map(({ name }) => `${name}, `)}
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  )
}