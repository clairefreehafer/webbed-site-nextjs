"use client";

import { PhotoFormState, editPhoto } from "@actions/photo";
import { useState } from "react";
import type { Photo, Prisma } from "@prisma/client";
import AdminForm, { HideSection, Input, Label } from "@components/admin/form";
import SubmitButton from "@components/admin/submit-button";

export default function UpdatePhotoForm({
  photoData,
  children,
}: { 
  photoData: Photo,
  children: React.ReactNode
}) {
  const [synchronizeWithXmp, setSynchronizeWithXmp] = useState(true);

  if (!photoData) {
    return <>❌ missing photo data!</>;
  }

  const initialState: PhotoFormState<Prisma.PhotoUpdateArgs["data"]> = {
    ...photoData,
    message: "",
  };

  const {
    xmpPath,
    id,
    smugMugKey,
    url,
    captureDate,
    title,
    description
  } = photoData;

  return (
    <AdminForm action={editPhoto} initialState={initialState}>
      <input type="hidden" name="smugMugKey" value={smugMugKey} />
      <Label htmlFor="synchronizeWithXmp">
        synchronize with xmp?
      </Label>
      <Input
        type="checkbox"
        name="synchronizeWithXmp"
        id="synchronizeWithXmp"
        checked={synchronizeWithXmp}
        onChange={(e) => setSynchronizeWithXmp(e.target.checked)}
      />

      <Label htmlFor="xmpPath">
        xmp path
      </Label>
      <Input
        type="text"
        name="xmpPath"
        id="xmpPath"
        defaultValue={xmpPath}
      />

      <HideSection $when={synchronizeWithXmp}>
        <Label htmlFor="url">
          url
        </Label>
        <Input type="text" name="url" id="url" defaultValue={url as string} readOnly />

        <Label htmlFor="captureDate">
          capture date
        </Label>
        <Input
          type="datetime-local"
          name="captureDate"
          id="captureDate"
          defaultValue={captureDate?.toISOString().slice(0, -1)}
          readOnly
        />

        <Label htmlFor="title">
          title
        </Label>
        <Input type="text" name="title" id="title" defaultValue={title as string} />

        <Label htmlFor="description">
          description
        </Label>
        <Input as="textarea" name="description" id="description" defaultValue={description as string} />

        <Label htmlFor="altText">
          alt text
        </Label>
        <Input
          as="textarea"
          name="altText"
          id="altText"
          defaultValue={photoData.altText as string}
        />

      </HideSection>
      
      {children}

      <Label htmlFor="updateSmugMug">
        update smugmug?
      </Label>
      <Input type="checkbox" name="updateSmugMug" id="updateSmugMug" />

      <SubmitButton>update photo</SubmitButton>
    </AdminForm>
  )
}