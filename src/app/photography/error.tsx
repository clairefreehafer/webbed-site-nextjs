"use client";

import { css } from "@panda/css";

export default function Error({ error }: { error: Error }) {
  return (
    <pre className={css({ margin: "1rem", whiteSpace: "pre-wrap" })}>
      ❌ {error.message}
    </pre>
  );
}
