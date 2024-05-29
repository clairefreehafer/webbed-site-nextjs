"use client";

import { Album, Icon, Photo } from "@prisma/client";
import styled from "styled-components";
import { Label } from "./form";
import DisplayIcon, { DisplayIconType } from "@components/icon";

const Fieldset = styled.fieldset`
  background-color: #1b1b1b;
  border: none;
  display: flex;
  width: 100%;
  grid-column-start: span 2;
  padding: 1rem;
`;

const Legend = styled.legend`
  font-size: 1.5rem;
  padding: 1rem;
  text-transform: uppercase;
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

type Props = {
  defaultValue?: Album["iconId"] | Photo["iconId"],
  icons: Icon[]
};

export default function IconSelect(
  { defaultValue, icons }: Props
) {
  return (
    <Fieldset>
      <Legend>icon</Legend>
      {icons.map((icon) => (
        <Label key={icon.id}>
          <Radio
            type="radio"
            name="iconId"
            value={icon.id}
            defaultChecked={icon.id === defaultValue}
          />
          <DisplayIcon icon={icon} />
        </Label>
      ))}
    </Fieldset>
  )
}