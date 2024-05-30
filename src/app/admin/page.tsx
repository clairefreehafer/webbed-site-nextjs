import { pressStart2P } from "@fonts";
import Link from "next/link";

export default function AdminPage() {
  return (
    <ul
      className={`${pressStart2P.className} mx-auto my-12 flex w-full justify-around`}
    >
      <li>
        <Link href="/admin/sections">sections</Link>
      </li>
      <li>
        <Link href="/admin/albums">albums</Link>
      </li>
      <li>
        <Link href="/admin/photos">photos</Link>
      </li>
      <li>
        <Link href="/admin/tags">tags</Link>
      </li>
      <li>
        <Link href="/admin/icons">icons</Link>
      </li>
    </ul>
  );
}
