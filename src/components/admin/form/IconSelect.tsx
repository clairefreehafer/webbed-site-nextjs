"use client";

import { Album, Photo, Prisma } from "@prisma/client";
import DisplayIcon from "@components/Icon";
import { getIcons } from "@utils/prisma/icon";
import RadioFieldset, { RadioInput } from "./radio-fieldset";

export type IconSelectProps = {
  defaultValue?: Album["iconId"] | Photo["iconId"];
  icons: Prisma.PromiseReturnType<typeof getIcons>;
};

export default function IconSelect({ defaultValue, icons }: IconSelectProps) {
  return (
    <RadioFieldset legend="icon">
      {icons?.length > 0 ? (
        icons.map((icon) => (
          <RadioInput
            name="iconId"
            value={`${icon.id}`}
            defaultChecked={defaultValue === icon.id}
            key={icon.id}
          >
            <DisplayIcon icon={icon} theme="admin" />
          </RadioInput>
        ))
      ) : (
        <pre>❌ no icons to choose from.</pre>
      )}
      {/* TODO: add none option */}
    </RadioFieldset>
  );
}
