"use client";

import Nav, { NavLink } from "../components/nav";
import styles from "./layout.module.scss";

const adminLinks: NavLink[] = [
  {
    pathname: "/admin",
    name: "admin home"
  },
  {
    pathname: "/admin/photo",
    name: "photos"
  },
  {
    pathname: "/admin/album",
    name: "albums"
  },
  {
    pathname: "/admin/tag",
    name: "tags"
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={styles.header}>
        <Nav navLinks={adminLinks} />
        <h1>admin panel</h1>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}