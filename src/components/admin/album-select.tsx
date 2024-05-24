"use client";

import { Album, Photo } from "@prisma/client";
import { Input, Label } from "./form";

type Props = {
  defaultValue?: Photo["albumName"],
  albums: Partial<Album>[]
};

export default function AlbumSelect(
  { defaultValue, albums }: Props
) {
  return (
    <>
      <Label htmlFor="albumName">
        select album
      </Label>
      <Input as="select" name="albumName" id="albumName" defaultValue={defaultValue || ""}>
        {albums.map((album) => (
          <option key={album.name}>
            {album.name}
          </option>
        ))}
      </Input>
    </>
  );
}