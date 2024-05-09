import { AlbumSections } from "@utils/albums";
import { Label } from "./form";

export default function SectionSelect(
  { defaultValue }:
  { defaultValue: AlbumSections }) {
  return (
    <Label>
      section
      <select name="section" defaultValue={defaultValue}>
        {Object.values(AlbumSections).map((section) => (
          <option value={section} key={section}>
            {section}
          </option>
        ))}
      </select>
    </Label>
  )
}