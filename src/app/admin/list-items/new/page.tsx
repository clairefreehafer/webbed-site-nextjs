"use client";

import { ListItemFormState, addListItem } from "@actions/listItem";
import AdminForm from "@components/admin/form";
import HideSection from "@components/admin/form/HideSection";
import Select from "@components/admin/form/Select";
import SubmitButton from "@components/admin/form/SubmitButton";
import { useState } from "react";
import { ListItemType, listItemTypes } from "types/lists";
import NewBookForm from "./book";
import NewCameraForm from "./camera";
import NewMusicForm from "./music";
import NewPodcastForm from "./podcast";
import { css } from "@panda/css";
import NewVideoGameForm from "./video-game";
import NewWebsiteForm from "./website";

const initialState: ListItemFormState = {};

const visible = css({
  gridRow: "2 / span 1",
});

const forms: Record<ListItemType, React.ReactNode> = {
  book: <NewBookForm />,
  camera: <NewCameraForm />,
  music: <NewMusicForm />,
  podcast: <NewPodcastForm />,
  "video game": <NewVideoGameForm />,
  website: <NewWebsiteForm />,
};

export default function Page() {
  const [type, setType] = useState<ListItemType>(listItemTypes[0]);
  return (
    <AdminForm initialState={initialState} action={addListItem}>
      <Select
        label="type"
        name="type"
        options={listItemTypes}
        onChange={(e) => setType(e.target.value as ListItemType)}
      />

      {listItemTypes.map((listItemType) => (
        <HideSection
          when={type !== listItemType}
          className={type === listItemType ? visible : ""}
          key={listItemType}
        >
          {forms[listItemType]}
        </HideSection>
      ))}

      <SubmitButton>create list</SubmitButton>
    </AdminForm>
  );
}
