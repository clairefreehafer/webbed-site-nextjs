"use client";

import { pressStart2P } from "@fonts";
import Link from "next/link";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  margin: 3rem auto;
  width: 100%;
`;

export default function AdminPage() {
  return (
    <Ul className={pressStart2P.className}>
      <li>
        <Link href="/admin/photos">photos</Link>
      </li>
      <li>
        <Link href="/admin/albums">albums</Link>
      </li>
      <li>
        <Link href="/admin/tags">tags</Link>
      </li>
    </Ul>
  )
}