"use client";

import { createAlbum } from "../actions";
import { AddAlbumFormState } from "../types";
import { useFormState } from "react-dom";

const initialState: AddAlbumFormState = {
  name: "",
};

export default function AdminAlbum() {
  const [state, formAction] = useFormState<AddAlbumFormState, FormData>(createAlbum, initialState);

  return (
    <form action={formAction}>
      <label>
        name
        <input type="text" name="album" required />
      </label>

      <p>{state?.message}</p>

      <button type="submit">create album</button>
    </form>
  )
}
