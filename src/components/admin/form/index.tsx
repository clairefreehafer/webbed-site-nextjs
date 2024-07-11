"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";

export type FormState<T> = Partial<T & { message?: string }>;

type Props<T> = {
  initialState: Awaited<T>;
  action: (state: Awaited<T>, payload: FormData) => T | Promise<T>;
  children: ReactNode;
};

export const inputStyles =
  "bg-input-bg mb-4 text-white last-of-type:mb-0 text-shadow shadow-input rounded-sm";

export const formGridClassNames =
  "align-center grid-cols-admin-form grid w-full gap-8";

export default function AdminForm<T extends { message?: string }>({
  action,
  initialState,
  children,
}: Props<T>) {
  const [state, formAction] = useFormState<T, FormData>(action, initialState);

  return (
    <form
      action={formAction}
      className={`${formGridClassNames} shadow-8-bit-white bg-radial-gradient m-8 p-8 text-2xl`}
    >
      {children}
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
