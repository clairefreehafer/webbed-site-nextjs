"use client";

import { css } from "@panda/css";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

const button = css({
  bg: "black",
  borderStyle: "outset",
  borderWidth: "8px",
  color: "white",
  gridColumn: "span 2",
  p: "3rem",
  textTransform: "uppercase",
  width: "100%",
});

const message = css({
  gridColumn: "span 2",
  width: "100%",
});

export default function SubmitButton({ children }: { children: ReactNode }) {
  const { pending, data } = useFormStatus();

  return (
    <>
      <button type="submit" disabled={pending} className={button}>
        {children}
      </button>
      {data?.get("message") && (
        <p className={message}>{data?.get("message") as string}</p>
      )}
    </>
  );
}
