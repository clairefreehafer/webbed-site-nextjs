"use client";

import { Album, Prisma } from "@prisma/client";
import { AlbumTypes } from "@utils/album";
import { editAlbum } from "@actions/album";
import { ChangeEvent, useState } from "react";
import SelectCoverPhoto, {
  SelectCoverPhotoProps,
} from "@components/photography/SelectCoverPhoto";
import SubmitButton from "@components/admin/form/SubmitButton";
import SectionSelect, {
  SectionSelectProps,
} from "@components/admin/form/SectionSelect";
import IconSelect, { IconSelectProps } from "@components/admin/form/IconSelect";
import { getAlbumData } from "@utils/prisma/album";
import AdminForm, { AdminFormState } from "@components/admin/form/index";
import TextInput from "@components/admin/form/TextInput";
import Select from "@components/admin/form/Select";
import HideSection from "@components/admin/form/HideSection";
import DateInput from "@components/admin/form/DateInput";
import CheckboxInput from "@components/admin/form/CheckboxInput";
import SectionHeader from "@components/admin/form/FormSectionHeader";
import NumberInput from "@components/admin/form/NumberInput";

type Props = {
  albumData: Prisma.PromiseReturnType<typeof getAlbumData>;
  albumPhotos: SelectCoverPhotoProps["albumPhotos"];
  sections: SectionSelectProps["sections"];
  icons: IconSelectProps["icons"];
};

export type UpdateAlbumFormState = AdminFormState<
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
    !!albumPhotos?.length
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
    sectionName: section?.name,
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

        <SelectCoverPhoto
          defaultValue={coverKey ?? null}
          albumPhotos={albumPhotos}
        />
      </HideSection>

      <HideSection when={rootSection !== "zelda"}>
        <SectionHeader>~~~ zelda ~~~</SectionHeader>

        <NumberInput label="compendium number" name="compendiumNumber" />
      </HideSection>

      <SubmitButton>update album</SubmitButton>
    </AdminForm>
  );
}
