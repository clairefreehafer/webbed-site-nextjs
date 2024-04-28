"use client";

import { usePathname } from "next/navigation";
import Nav from "../../components/nav";

export default function TableRoot() {
  const pathname = usePathname();

  const links = ["create", "read", "update", "delete"].map((action) => (
    {
      pathname: `${pathname}/${action}`,
      name: action
    }
  ));

  return (
    <Nav navLinks={links} />
  )
}