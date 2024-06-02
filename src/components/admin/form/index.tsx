"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";

export type FormState<T> = Partial<T & { message?: string }>;

type Props<T> = {
  initialState: Awaited<T>;
  action: (state: Awaited<T>, payload: FormData) => T | Promise<T>;
  children: ReactNode;
};

export const formGridClassNames =
  "align-center grid-cols-admin-form grid w-full gap-8";

export default function AdminForm<T extends { message?: string }>({
  action,
  initialState,
  children,
}: Props<T>) {
  const [state, formAction] = useFormState<T, FormData>(action, initialState);

  return (
    <form action={formAction} className={`${formGridClassNames} m-8`}>
      {children}
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
