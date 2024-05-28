"use client";

import { editPhoto } from "@actions/photo";
import { ChangeEvent, useState } from "react";
import type { Prisma } from "@prisma/client";
import AdminForm, { FormState, HideSection, Input, Label, SecitonHeader } from "@components/admin/form";
import SubmitButton from "@components/admin/submit-button";
import { getAdminPhoto } from "@utils/prisma/photo";
import AlbumSelect from "@components/admin/album-select";
import { getAlbumOptions } from "@utils/prisma";

export type UpdatePhotoFormState = FormState<
  Prisma.PromiseReturnType<typeof getAdminPhoto> &
  PrismaJson.Metadata & {
    synchronizeWithXmp?: boolean;
    rootSection?: string;
  }
>;

type Props = {
  photoData: Prisma.PromiseReturnType<typeof getAdminPhoto>,
  albums: Prisma.PromiseReturnType<typeof getAlbumOptions>
};

export default function UpdatePhotoForm(
  { photoData, albums }: Props
) {
  const [synchronizeWithXmp, setSynchronizeWithXmp] = useState(true);
  const [rootSection, setRootSection] = useState(photoData.rootSection);

  async function handleAlbumChange(e: ChangeEvent<HTMLSelectElement>) {
    const result = await fetch(`/api/section/root/${e.target.value}`);
    const resultJson = await result.json();

    setRootSection(resultJson.rootSection);
  }

  const {
    albumName,
    xmpPath,
    smugMugKey,
    captureDate,
    metadata,
  } = photoData;

  const initialState: UpdatePhotoFormState = {};

  return (
    <AdminForm action={editPhoto} initialState={initialState}>
      <input type="hidden" name="smugMugKey" value={smugMugKey} />
      <input type="hidden" name="rootSection" value={rootSection || ""} />

      <AlbumSelect
        albums={albums}
        defaultValue={albumName}
        onChange={handleAlbumChange}
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

      <Label htmlFor="altText">
        alt text
      </Label>
      <Input
        as="textarea"
        name="altText"
        id="altText"
        defaultValue={photoData.altText as string}
      />

      <Input
        type="checkbox"
        name="synchronizeWithXmp"
        id="synchronizeWithXmp"
        checked={synchronizeWithXmp}
        onChange={(e) => setSynchronizeWithXmp(e.target.checked)}
      />
      <Label htmlFor="synchronizeWithXmp" css={{ justifyContent: "flex-start" }}>
        synchronize with xmp?
      </Label>

      <HideSection as="div" $when={synchronizeWithXmp}>
        <SecitonHeader>~~~ XMP ~~~</SecitonHeader>

        <Label htmlFor="title">
          title
        </Label>
        <Input type="text" name="title" id="title" defaultValue={metadata?.title as string} />

        <Label htmlFor="description">
          description
        </Label>
        <Input as="textarea" name="description" id="description" defaultValue={metadata?.description as string} />

        <HideSection as="div" $when={rootSection === "zelda"}>
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
        </HideSection>
      </HideSection>

      <HideSection as="div" $when={rootSection !== "zelda"}>
        <SecitonHeader>~~~ ZELDA ~~~</SecitonHeader>

        <Label htmlFor="compendiumIconId">
          icon
        </Label>
        <div></div>

        <Input type="number" name="compendiumNumber" id="compendiumNumber" />
        <Label htmlFor="compendiumNumber" css={{ justifyContent: "flex-start" }}>
          compendium number
        </Label>
      </HideSection>

      {/* <Label htmlFor="updateSmugMug">
        update smugmug?
      </Label>
      <Input type="checkbox" name="updateSmugMug" id="updateSmugMug" /> */}

      <SubmitButton>✍️ update photo ✍️</SubmitButton>
    </AdminForm>
  )
}