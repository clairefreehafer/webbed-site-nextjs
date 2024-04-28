"use client";

import { useFormState } from "react-dom";
import { createPhoto } from "./actions";

export default function AdminPhoto() {
  const [message, formAction]: any = useFormState(createPhoto, "");

  return (
    <main>
      <h1>photo admin panel</h1>
      <h2>add photo</h2>
      <form action={formAction}>
        <label>
          smug mug key
          <input type="text" name="smugMugKey" required />
        </label>

        <label>
          path
          <input type="text" name="path" required />
        </label>

        <label>
          album
          {/* dropdown of current albums and option to add new? */}
        </label>

        <p>{message}</p>

        <button type="submit">add photo</button>
      </form>
    </main>
  )
}