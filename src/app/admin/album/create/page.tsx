"use client";

import { createAlbum } from "../actions";
import { AddAlbumFormState } from "../types";
import { useFormState } from "react-dom";

const initialState: AddAlbumFormState = {
  name: "",
  section: "photography",
};

export default function AdminAlbum() {
  const [state, formAction] = useFormState<AddAlbumFormState, FormData>(createAlbum, initialState);

  return (
    <form action={formAction}>
      <label>
        name
        <input type="text" name="album" required />
      </label>

      <label>
        section
        <select name="section">
          <option>photography</option>
          <option value="new horizons">animal crossing &rarr; new horizons</option>
          <option value="new leaf">animal crossing &rarr; new leaf</option>
          <option value="tears of the kingdom">zelda &rarr; tears of the kingdom</option>
          <option value="breath of the wild">zelda &rarr; breath of the wild</option>
        </select>
      </label>

      <p>{state?.message}</p>

      <button type="submit">create album</button>
    </form>
  )
}
