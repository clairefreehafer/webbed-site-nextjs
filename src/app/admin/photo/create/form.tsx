"use client";

import { createPhoto } from "../actions";
import { CreatePhotoFormState } from "../types";
import { useFormState } from "react-dom";
import styles from "./page.module.css";
import { Prisma } from "@prisma/client";

export const initialState: CreatePhotoFormState = {
  smugMugKey: "",
  url: "",
  captureDate: "",
  album: "" as Prisma.AlbumCreateNestedOneWithoutPhotosInput,
  metadata: {},
  tags: {
    connectOrCreate: []
  },
  message: "",
};

export default function CreatePhotoForm({ children }: { children: React.ReactNode }) {
  const [state, formAction] = useFormState<CreatePhotoFormState, FormData>(createPhoto, initialState);

  return (
    <>
      <h3>create</h3>
      <form action={formAction} className={styles.form}>
        <label className={styles.label}>
          smug mug key
          <input type="text" name="smugMugKey" required className={styles.input} />
        </label>

        <label className={styles.label}>
          path
          <input type="text" name="path" required className={styles.input} />
        </label>

        {children}

        <label className={styles.label}>
          alt text
          <textarea name="altText" className={styles.input} />
        </label>

        <p>{state?.message}</p>

        {/* TODO: show table of added data */}

        <button type="submit">add photo</button>
      </form>
    </>
  )
}