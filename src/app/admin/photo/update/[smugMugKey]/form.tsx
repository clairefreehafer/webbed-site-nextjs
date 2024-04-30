"use client";

import { useFormState } from "react-dom";
import styles from "./form.module.scss";
import { updatePhoto } from "../../actions";
import { useState } from "react";
import type { Photo } from "@prisma/client";

const { form, label, manualSection, hide } = styles;

export type UpdatePhotoFormState = Photo & {
  syncrhonizeWithXmp?: boolean;
  updateSmugMug?: boolean;
  message?: string;
}

export default function UpdatePhotoForm({
  id,
  smugMugKey,
  url,
  captureDate,
  metadata,
  albumName,
  children,
}: Photo & { children: React.ReactNode }) {
  const initialState: UpdatePhotoFormState = {
    id,
    smugMugKey,
    url,
    captureDate,
    metadata,
    updateSmugMug: false,
    syncrhonizeWithXmp: true,
    albumName,
  };
  const [synchronizeWithXmp, setSynchronizeWithXmp] = useState(true);
  const [state, formAction] = useFormState<UpdatePhotoFormState, FormData>(updatePhoto, initialState);

  return (
    <form action={formAction} className={form}>
      <label>
        synchronize with xmp?
        <input
          type="checkbox"
          name="synchronizeWithXmp"
          checked={synchronizeWithXmp}
          onChange={(e) => setSynchronizeWithXmp(e.target.checked)}
        />
      </label>

      <div className={`${manualSection} ${synchronizeWithXmp ? hide : ""}`}>
        <label className={label}>
          id
          <input type="number" name="id" defaultValue={id} readOnly />
        </label>

        <label className={label}>
          smugMugKey
          <input type="text" name="smugMugKey" defaultValue={smugMugKey as string} readOnly />
        </label>

        <label className={label}>
          url
          <input type="text" name="url" defaultValue={url as string} readOnly />
        </label>

        <label className={label}>
          captureDate
          <input
            type="datetime-local"
            name="captureDate"
            defaultValue={captureDate?.toISOString().slice(0, -1)}
            readOnly
          />
        </label>

        {children}

        <label className={label}>
          metadata
          <textarea defaultValue={JSON.stringify(metadata)} name="metadata" />
        </label>
      </div>

      <label className={label}>
        update smugmug?
        <input type="checkbox" name="updateSmugMug" />
      </label>

      {state?.message && <p>{state.message}</p>}

      <button type="submit">update photo</button>
    </form>
  )
}