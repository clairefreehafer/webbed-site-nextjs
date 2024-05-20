"use client";

import { flexColumnCenter } from "@styles/layout";
import { ReactNode } from "react";
import { useFormState } from "react-dom";
import styled from "styled-components";

const Form = styled.form`
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: auto;
  width: 100%;

  & > * {
    padding: 3rem;
  }
`;

export const Label = styled.label`
  ${flexColumnCenter};
  margin: 0.5rem;
`;

export const Input = styled.input`
  font-family: var(--font-pt-mono), monospace;
  margin: 0.5rem;
`;

export const HideSection = styled.div<{ $when: boolean }>`
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