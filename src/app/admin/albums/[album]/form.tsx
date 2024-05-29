"use client";

import AdminForm, { FormState, HideSection, Input, Label, SecitonHeader } from "@components/admin/form";
import { Album, Prisma } from "@prisma/client";
import { AlbumTypes, displayName } from "@utils/albums";
import { editAlbum } from "@actions/album";
import { useState } from "react";
import SelectCoverPhoto, { SelectCoverPhotoProps } from "@components/photography/select-cover-photo";
import SubmitButton from "@components/admin/submit-button";
import SectionSelect, { SectionSelectProps } from "@components/admin/section-select";
import IconSelect, { IconSelectProps } from "@components/admin/icon-select";
import { getAlbumData } from "@utils/prisma/album";

type Props = {
  albumData: Prisma.PromiseReturnType<typeof getAlbumData>,
  albumPhotos: SelectCoverPhotoProps["albumPhotos"],
  sections: SectionSelectProps["sections"],
  icons: IconSelectProps["icons"]
};

export type UpdateAlbumFormState = FormState<
  Omit<Props["albumData"], "section" | "photos"> & {
    sectionName: Album["sectionName"]
  }
>;

export default function UpdateAlbumForm(
  { albumData, albumPhotos, sections, icons }: Props
) {
  const [autoDateGeneration, setAutoDateGeneration] = useState(!!albumPhotos.length);
  const [rootSection, setRootSection] = useState(albumData.rootSection);

  const { id, name, date, type, coverKey, section, iconId } = albumData;

  const initialState: UpdateAlbumFormState = {
    id,
    name,
    type,
    iconId,
    date,
    coverKey,
    sectionName: section.name,
  };

  return (
    <AdminForm action={editAlbum} initialState={initialState}>
      <input type="hidden" name="id" defaultValue={id} readOnly />

      <Label htmlFor="name">
        name
      </Label>
      <Input
        type="text"
        name="name"
        id="name"
        defaultValue={displayName(name)}
      />

      <SectionSelect
        sections={sections}
        defaultValue={section}
        onChange={setRootSection}
      />

      <Label htmlFor="type">
        type
      </Label>
      <Input as="select" name="type" id="type" defaultValue={type}>
        {Object.values(AlbumTypes).map((type) => (
          <option key={type}>{type}</option>
        ))}
      </Input>

      <HideSection as="div" $when={rootSection === "zelda"}>
        <Label htmlFor="date">
          date
        </Label>
        <Input
          type="datetime-local"
          name="date"
          value={date?.toISOString().slice(0, 19)}
          readOnly={autoDateGeneration}
        />

        <Input
          type="checkbox"
          checked={autoDateGeneration}
          name="generateDateAutomatically"
          id="generateDateAutomatically"
          onChange={(e) => setAutoDateGeneration(e.target.checked)}
        />
        <Label
          htmlFor="generateDateAutomatically"
          css={{ justifyContent: "flex-start", margin: "1rem" }}
        >
          generate date automatically?
        </Label>
      </HideSection>

      <SelectCoverPhoto
        coverKey={coverKey}
        albumPhotos={albumPhotos}
      />

      <HideSection as="div" $when={rootSection !== "zelda"}>
        <SecitonHeader>~~~ ZELDA ~~~</SecitonHeader>

        <IconSelect icons={icons} defaultValue={iconId} />
      </HideSection>

      {/* <Label>
        add photos (by smugmugkey?)
      </Label> */}

      <SubmitButton>update album</SubmitButton>
    </AdminForm>
  )
}