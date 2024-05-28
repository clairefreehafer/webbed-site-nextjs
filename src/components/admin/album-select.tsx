"use client";

import { Album, Photo } from "@prisma/client";
import { Input, Label } from "./form";
import { ChangeEvent } from "react";

type Props = {
  defaultValue?: Photo["albumName"],
  albums: Partial<Album>[],
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