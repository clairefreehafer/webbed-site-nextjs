"use client";

import Link from "next/link";
import styled from "styled-components";

const H3 = styled.h3`
  font-size: 2rem;
  font-weight: normal;
  // TODO: add a fun underline
`;

export default function NewHorizonsPage() {
  return (
    <>
      <H3>new horizons</H3>
      <ul>
        <li><Link href="/animal-crossing/new-horizons/albums/">albums</Link></li>
        <li>collections &rarr; browse by character</li>
        <li>curated &rarr; diary/journal (or this could be a custom album)</li>
        <li>random</li>
        <li>technical &rarr; gifs</li>
        <li>recently added</li>
        <li>view all</li>
      </ul>
    </>
  )
}