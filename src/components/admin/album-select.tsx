"use client";

import { Photo, Prisma } from "@prisma/client";
import { Input, Label } from "./form";
import { ChangeEvent } from "react";
import { getAlbumNames } from "@utils/prisma";

type Props = {
  defaultValue?: Photo["albumName"],
  albums: Prisma.PromiseReturnType<typeof getAlbumNames>,
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
};

export default function AlbumSelect(
  { defaultValue, albums, onChange }: Props
) {
  return (
    <>
      <Label htmlFor="albumName">
        album
      </Label>
      <Input
        as="select"
        name="albumName"
        id="albumName"
        defaultValue={defaultValue || ""}
        onChange={onChange}
      >
        {albums.map((album) => (
          <option key={album.name}>
            {album.name}
          </option>
        ))}
      </Input>
    </>
  );
}