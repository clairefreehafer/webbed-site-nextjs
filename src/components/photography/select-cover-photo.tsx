"use client";

import { Label } from "@components/admin/form";
import { Photo } from "@prisma/client";
import { sizePhoto } from "@utils/photo";
import styled from "styled-components";

const Fieldset = styled.fieldset`
  display: flex;
  width: 100%;
`;

const Radio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  & + img {
    cursor: pointer;
  }

  &:checked + img {
    outline: 3px dashed white;
  }
`;

export default function SelectCoverPhoto({
  coverKey,
  albumPhotos
}: {
  coverKey: string | null,
  albumPhotos: Photo[]
}) {
  return (
    <Fieldset>
      <legend>cover photo</legend>
      {albumPhotos.map((photo) => (
        <Label key={photo.smugMugKey}>
          <Radio
            type="radio"
            name="coverKey"
            value={photo.smugMugKey}
            defaultChecked={coverKey === photo.smugMugKey}
          />
          <img src={sizePhoto(photo.url, "Th")} alt="" />
        </Label>
      ))}
    </Fieldset>
  )
}