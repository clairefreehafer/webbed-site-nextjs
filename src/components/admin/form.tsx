"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";
import styled from "styled-components";

const Form = styled.form`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 25% 75%;
  grid-template-rows: auto;
  margin: 2rem;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: flex-end;
  margin: 3rem 0 3rem;
  text-transform: uppercase;
`;

export const Input = styled.input`
  background-color: #1b1b1b;
  border: 0;
  font-family: var(--font-pt-mono), monospace;
  font-size: 1.5rem;
  padding: 3rem;
`;

export const HideSection = styled.div<{ $when: boolean }>`
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: auto;
  grid-column-start: span 2;
  padding: 0;
  width: 100%;

  ${({ $when }) => $when && `
    visibility: hidden;
    height: 0;
  `}
`;

type Props<T> = {
  initialState: Awaited<T>;
  action: (state: T, payload: FormData) => T | Promise<T>;
  children: Readonly<ReactNode>;
};

export default function AdminForm<T extends { message?: string }>(
  { action, initialState, children }:
  Props<T>
) {
  const [state, formAction] = useFormState<T, FormData>(action, initialState);

  return (
    <Form action={formAction}>
      {children}
      {state?.message && <p>{state.message}</p>}
    </Form>
  )
}