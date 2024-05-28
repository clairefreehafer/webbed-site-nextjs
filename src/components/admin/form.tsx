"use client";

import { flexColumnCenter } from "@styles/layout";
import { ReactNode } from "react";
import { useFormState } from "react-dom";
import styled from "styled-components";

const Form = styled.form`
  align-items: center;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 25% 1fr;
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
  text-align: right;
  text-transform: uppercase;
`;

export const Input = styled.input`
  background-color: #1b1b1b;
  border: 0;
  font-family: var(--font-pt-mono), monospace;
  font-size: 1.5rem;
  padding: 3rem;

  &[type="checkbox"] {
    height: 3rem;
  }
`;

export const HideSection = styled(Form)<{ $when: boolean }>`
  grid-column-start: span 2;
  margin: 0;
  width: 100%;

  ${({ $when }) => $when && `
    visibility: hidden;
    height: 0;
  `}
`;

export const SecitonHeader = styled.p`
  ${flexColumnCenter};
  grid-column-start: span 2;
  font-size: 2em;
`;

export type FormState<T> = Partial<T & { message?: string }>;

type Props<T> = {
  initialState: Awaited<T>;
  action: (state: Awaited<T>, payload: FormData) => T | Promise<T>;
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