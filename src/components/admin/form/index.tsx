"use client";

import { css } from "@panda/css";
import { ReactNode } from "react";
import { useFormState } from "react-dom";

export type AdminFormState<T> = Partial<T> & { message?: string };

type Props<T> = {
  initialState: Awaited<T>;
  action: (state: Awaited<T>, payload: FormData) => T | Promise<T>;
  children: ReactNode;
};

const form = css({
  alignItems: "center",
  bg: "{gradients.radial}",
  boxShadow: "8BitWhite",
  display: "grid",
  fontSize: "1.5rem",
  gap: "2rem",
  gridTemplateColumns: "25% 1fr",
  my: "2rem",
  p: "2rem",
});

const message = css({
  gridColumn: "span 2",
  textAlign: "center",
  width: "100%",
});

export default function AdminForm<T extends { message?: string }>({
  action,
  initialState,
  children,
}: Props<T>) {
  const [state, formAction] = useFormState<T, FormData>(action, initialState);

  return (
    <form action={formAction} className={form}>
      {children}
      {/* TODO: add submit button? */}
      {state?.message && <p className={message}>{state.message}</p>}
    </form>
  );
}
