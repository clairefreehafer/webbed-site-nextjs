"use client";

import { Icon } from "@prisma/client";
import styled from "styled-components";
import { Label } from "./form";

const Fieldset = styled.fieldset`
  display: flex;
  width: 100%;
  grid-column-start: span 2;
`;

const Radio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  & + img {
    cursor: pointer;
  }

  &:checked + * {
    outline: 3px dashed white;
  }
`;

const Character = styled.span`
  font-size: 2rem;
  padding: 0.5rem;
`;

export default function IconSelect(
  { defaultValue, icons }:
  { defaultValue?: Icon["id"] | null, icons: Icon[] }
) {
  return (
    <Fieldset>
      <legend>icon</legend>
      {icons.map(({ id, imagePath, character }) => (
        <Label key={id}>
          <Radio
            type="radio"
            name="iconId"
            value={id}
            defaultChecked={id === defaultValue}
          />
          {imagePath ? (
            <img src={imagePath} alt="" />
          ) : (
            <Character>{character}</Character>
          )}
        </Label>
      ))}
    </Fieldset>
  )
}