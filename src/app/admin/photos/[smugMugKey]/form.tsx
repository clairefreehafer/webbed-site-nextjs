"use client";

import { PhotoFormState, updatePhoto } from "@actions/photo";
import { useState } from "react";
import type { Photo } from "@prisma/client";
import AdminForm, { HideSection, Input, Label } from "@components/admin/form";

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

  const initialState: PhotoFormState = {
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
    <AdminForm action={updatePhoto} initialState={initialState}>
      <Label>
        synchronize with xmp?
        <Input
          type="checkbox"
          name="synchronizeWithXmp"
          checked={synchronizeWithXmp}
          onChange={(e) => setSynchronizeWithXmp(e.target.checked)}
        />
      </Label>

      <Label>
        xmp path
        <Input
          type="text"
          name="xmpPath"
          defaultValue={xmpPath}
        />
      </Label>

      <HideSection $when={synchronizeWithXmp}>
        <Label>
          id
          <Input type="number" name="id" defaultValue={id} readOnly />
        </Label>

        <Label>
          smugMugKey
          <Input type="text" name="smugMugKey" defaultValue={smugMugKey as string} readOnly />
        </Label>

        <Label>
          url
          <Input type="text" name="url" defaultValue={url as string} readOnly />
        </Label>

        <Label>
          captureDate
          <Input
            type="datetime-local"
            name="captureDate"
            defaultValue={captureDate?.toISOString().slice(0, -1)}
            readOnly
          />
        </Label>

        <Label>
          title
          <Input type="text" name="title" defaultValue={title as string} />
        </Label>

        <Label>
          description
          <Input as="textarea" name="description" defaultValue={description as string} />
        </Label>

        <Label>
          alt text
          <Input
            as="textarea"
            name="altText"
            defaultValue={photoData.altText as string}
          />
        </Label>

      </HideSection>
      
      {children}

      <Label>
        update smugmug?
        <Input type="checkbox" name="updateSmugMug" />
      </Label>

      <button type="submit">update photo</button>
    </AdminForm>
  )
}