import Link from "next/link";

export default function AdminPage() {
  return (
    <ul>
      <li>
        <Link href="/admin/photos">photos</Link>
      </li>
      <li>
        <Link href="/admin/albums">albums</Link>
      </li>
      <li>
        <Link href="/admin/tags">tags</Link>
      </li>
    </ul>
  )
}