"use client";

import { Album, Prisma } from "@prisma/client";
import { AlbumTypes } from "@utils/album";
import { editAlbum } from "@actions/album";
import { ChangeEvent, useState } from "react";
import SelectCoverPhoto, {
  SelectCoverPhotoProps,
} from "@components/photography/select-cover-photo";
import SubmitButton from "@components/admin/form/submit-button";
import SectionSelect, {
  SectionSelectProps,
} from "@components/admin/form/section-select";
import IconSelect, {
  IconSelectProps,
} from "@components/admin/form/icon-select";
import { getAlbumData } from "@utils/prisma/album";
import AdminForm, { FormState } from "@components/admin/form/index";
import TextInput from "@components/admin/form/text-input";
import Select from "@components/admin/form/select";
import HideSection from "@components/admin/form/hide-section";
import DateInput from "@components/admin/form/date-input";
import CheckboxInput from "@components/admin/form/checkbox-input";
import SectionHeader from "@components/admin/form/section-header";
import NumberInput from "@components/admin/form/number-input";

type Props = {
  albumData: Prisma.PromiseReturnType<typeof getAlbumData>;
  albumPhotos: SelectCoverPhotoProps["albumPhotos"];
  sections: SectionSelectProps["sections"];
  icons: IconSelectProps["icons"];
};

export type UpdateAlbumFormState = FormState<
  Omit<Props["albumData"], "section" | "photos" | "date"> & {
    sectionName: Album["sectionName"];
    date?: string;
  }
>;

export default function UpdateAlbumForm({
  albumData,
  albumPhotos,
  sections,
  icons,
}: Props) {
  const [generateDateAutomatically, setGenerateDateAutomatically] = useState(
    !!albumPhotos.length,
  );
  const [rootSection, setRootSection] = useState(albumData.rootSection);

  const { id, name, date, type, coverKey, section, iconId } = albumData;

  const initialState: UpdateAlbumFormState = {
    id,
    name,
    type,
    iconId,
    coverKey,
    date: date?.toISOString().slice(0, 19),
    sectionName: section.name,
  };

  return (
    <AdminForm action={editAlbum} initialState={initialState}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <TextInput label="name" name="name" defaultValue={initialState.name} />

      <SectionSelect
        sections={sections}
        defaultValue={section}
        onChange={setRootSection}
      />

      <Select
        label="type"
        name="type"
        options={Object.values(AlbumTypes)}
        defaultValue={initialState.type}
      />

      <HideSection when={rootSection === "zelda"}>
        <DateInput
          label="date"
          name="date"
          defaultValue={initialState.date}
          readOnly={generateDateAutomatically}
        />

        <CheckboxInput
          label="generate date automatically?"
          name="generateDateAutomatically"
          checked={generateDateAutomatically}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGenerateDateAutomatically(e.target.checked)
          }
        />
      </HideSection>

      <IconSelect icons={icons} defaultValue={iconId} />

      <HideSection when={rootSection !== "photography"}>
        <SectionHeader>~~~ photography ~~~</SectionHeader>

        <SelectCoverPhoto defaultValue={coverKey} albumPhotos={albumPhotos} />
      </HideSection>

      <HideSection when={rootSection !== "zelda"}>
        <SectionHeader>~~~ zelda ~~~</SectionHeader>

        <NumberInput label="compendium number" name="compendiumNumber" />
      </HideSection>

      <SubmitButton>update album</SubmitButton>
    </AdminForm>
  );
}
