import Link from "next/link";

export default function AdminPhotoPage() {
  return (
    <ul>
      <li><Link href="/admin/photo/create">create</Link></li>
      <li>read</li>
      <li>update</li>
      <li>delete</li>
    </ul>
  )
}