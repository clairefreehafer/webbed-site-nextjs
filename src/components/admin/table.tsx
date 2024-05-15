"use client";

import styled from "styled-components"

export const AdminTable = styled.table`
  border-collapse: collapse;
  margin: 2rem auto;
  width: 100%;

  & thead tr {
    border-bottom: 3px dotted white;
    
    & th {
      padding: 0.5rem;
    }
  }

  & td {
    border-bottom: 1px dotted white;
    text-align: center;
    padding: 0.5rem;
  }
`;

export default AdminTable;