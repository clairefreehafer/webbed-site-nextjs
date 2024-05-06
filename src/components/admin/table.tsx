"use client";

import styled from "styled-components"

export const AdminTable = styled.table`
  margin: auto;
  width: 100%;

  & thead tr {
    border-bottom: 1px dotted white;
  }

  & td {
    text-align: center;
  }
`;

export default AdminTable;