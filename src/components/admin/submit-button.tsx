"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import styled from "styled-components";

const Button = styled.button`
  border: 5px outset;
  font-family: var(--font-pt-mono), monospace;
  font-size: 1.5rem;
  grid-column-start: span 2;
  text-transform: uppercase;
`;

export default function SubmitButton({ children }: { children: ReactNode }) {
  const { pending, data } = useFormStatus();

  return (
    <>
      <Button type="submit" disabled={pending}>{children}</Button>
      <p>{data?.get("message") as string}</p>
    </>
  );
}