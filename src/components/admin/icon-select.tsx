"use client";

import { Album, Photo, Prisma } from "@prisma/client";
import { Fieldset, FieldsetGrid, ImageRadio, Label, Legend } from "./form";
import DisplayIcon from "@components/icon";
import { getIcons } from "@utils/prisma/icon";

export type IconSelectProps = {
  defaultValue?: Album["iconId"] | Photo["iconId"],
  icons: Prisma.PromiseReturnType<typeof getIcons>,
};

export default function IconSelect(
  { defaultValue, icons }: IconSelectProps
) {
  return (
    <Fieldset>
      <Legend>icon</Legend>
      <FieldsetGrid>
        {icons.map((icon) => (
          <Label key={icon.id} css={{ margin: 0, justifyContent: "center", textAlign: "center" }}>
            <ImageRadio
              type="radio"
              name="iconId"
              value={icon.id}
              defaultChecked={icon.id === defaultValue}
            />
            <DisplayIcon icon={icon} height={3} />
          </Label>
        ))}
      </FieldsetGrid>
    </Fieldset>
  )
}