"use client";

import { Album, Photo, Prisma } from "@prisma/client";
import DisplayIcon from "@components/icon";
import { getIcons } from "@utils/prisma/icon";

export type IconSelectProps = {
  defaultValue?: Album["iconId"] | Photo["iconId"];
  icons: Prisma.PromiseReturnType<typeof getIcons>;
};

export default function IconSelect({ defaultValue, icons }: IconSelectProps) {
  return (
    <fieldset className="col-start-[span_2] flex w-full bg-[#1b1b1b] p-8">
      <legend>ICON</legend>
      <div className="grid w-full grid-cols-[repeat(auto-fill,_5rem)] grid-rows-[5rem]">
        {icons.map((icon) => (
          <label key={icon.id} className="flex items-center justify-center p-2">
            <input
              type="radio"
              name="iconId"
              value={icon.id}
              defaultChecked={icon.id === defaultValue}
              className="peer absolute h-0 w-0 opacity-0"
            />
            <div className="items-middle flex h-full w-full justify-center border-4 border-dashed border-transparent peer-checked:border-white">
              <DisplayIcon icon={icon} theme="admin" />
            </div>
          </label>
        ))}
        {/* TODO: add none option */}
      </div>
    </fieldset>
  );
}
