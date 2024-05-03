"use client";

import { flexColumnCenter } from "@styles/layout";
import Link from "next/link";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
`;

const Cell = styled.div`
  ${flexColumnCenter};
`;

export default function AnimalCrossing() {
  return (
    <Grid>
      <Cell>
        <h3>browse by game</h3>
        <ul>
          <li><Link href="/animal-crossing/new-horizons">new horizons</Link></li>
        </ul>
      </Cell>

      <Cell>
        <h3>browse by character</h3>
      </Cell>
      
      <Cell>
        <h3>random</h3>
      </Cell>

      <Cell>
        <h3>recently added</h3>
      </Cell>
    </Grid>
  )
}