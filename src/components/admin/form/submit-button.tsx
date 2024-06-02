"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children: ReactNode }) {
  const { pending, data } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className="border-outset col-start-[span_2] w-full border-8 bg-neutral-800 p-12 uppercase text-white"
      >
        {children}
      </button>
      <p>{data?.get("message") as string}</p>
    </>
  );
}
