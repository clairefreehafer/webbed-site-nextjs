"use client";

import { editPhoto } from "@actions/photo";
import { ChangeEvent, useState } from "react";
import { Prisma } from "@prisma/client";

import SubmitButton from "@components/admin/form/submit-button";
import { getAdminPhoto } from "@utils/prisma/photo";
import IconSelect from "@components/admin/form/IconSelect";
import AdminForm, { FormState } from "@components/admin/form/index";
import TextInput from "@components/admin/form/text-input";
import CheckboxInput from "@components/admin/form/CheckboxInput";
import HideSection from "@components/admin/form/HideSection";
import DateInput from "@components/admin/form/DateInput";
import NumberInput from "@components/admin/form/number-input";
import Textarea from "@components/admin/form/textarea";
import Select from "@components/admin/form/select";
import { getAlbumNames } from "@utils/prisma/album";
import SectionHeader from "@components/admin/form/section-header";
import { getIcons } from "@utils/prisma/icon";

export type UpdatePhotoFormState = FormState<
  Prisma.PromiseReturnType<typeof getAdminPhoto> &
    PrismaJson.Metadata & {
      synchronizeWithXmp?: boolean;
      rootSection?: string | null;
    }
>;

type Props = {
  photoData: Prisma.PromiseReturnType<typeof getAdminPhoto>;
  albums: Prisma.PromiseReturnType<typeof getAlbumNames>;
  icons: Prisma.PromiseReturnType<typeof getIcons>;
};

export default function UpdatePhotoForm({ photoData, albums, icons }: Props) {
  const [synchronizeWithXmp, setSynchronizeWithXmp] = useState(true);
  const [rootSection, setRootSection] = useState(photoData.rootSection);

  async function handleAlbumChange(e: ChangeEvent<HTMLSelectElement>) {
    const result = await fetch(`/api/section/root/${e.target.value}`);
    const resultJson = await result.json();

    setRootSection(resultJson.rootSection);
  }

  const { xmpPath, smugMugKey, captureDate, metadata, iconId } = photoData;

  const initialState: UpdatePhotoFormState = {
    ...photoData,
    ...photoData.metadata,
    rootSection,
  };

  return (
    <AdminForm action={editPhoto} initialState={initialState}>
      <input type="hidden" name="smugMugKey" value={smugMugKey} />
      <input type="hidden" name="rootSection" value={rootSection || ""} />

      <Select
        label="album"
        name="albumName"
        options={albums.map(({ name }) => name)}
        defaultValue={initialState.albumName || ""}
        onChange={handleAlbumChange}
      />

      <Textarea label="alt text" name="altText" />

      <TextInput label="xmp path" name="xmpPath" defaultValue={xmpPath} />

      <CheckboxInput
        label="synchronize with xmp?"
        name="synchornizeWithXmp"
        checked={synchronizeWithXmp}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSynchronizeWithXmp(e.target.checked)
        }
      />

      <HideSection when={synchronizeWithXmp}>
        <SectionHeader>~~~ XMP ~~~</SectionHeader>

        <TextInput label="title" name="title" defaultValue={metadata?.title} />

        <Textarea
          label="description"
          name="description"
          defaultValue={metadata?.description}
        />

        <HideSection when={rootSection === "zelda"}>
          <DateInput
            label="capture date"
            name="captureDate"
            defaultValue={captureDate?.toISOString().slice(0, -1)}
            readOnly
          />
        </HideSection>
      </HideSection>

      <HideSection when={rootSection !== "zelda"}>
        <SectionHeader>~~~ ZELDA ~~~</SectionHeader>

        <IconSelect icons={icons} defaultValue={iconId} />

        <NumberInput
          label="compendium number"
          name="compendiumNumber"
          defaultValue={metadata?.compendiumNumber}
        />
      </HideSection>

      <SubmitButton>✍️ update photo ✍️</SubmitButton>
    </AdminForm>
  );
}
