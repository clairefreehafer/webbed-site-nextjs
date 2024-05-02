import { ANIMAL_CROSSING_SECTIONS, AlbumSections, ZELDA_SECTIONS } from "@utils/albums";
import { Label } from "./form";

export default function SectionSelect(
  { defaultValue }:
  { defaultValue: AlbumSections }) {
  return (
    <Label>
      section
      <select name="section" defaultValue={defaultValue}>
        {Object.values(AlbumSections).map((section) => {
          if (ANIMAL_CROSSING_SECTIONS.includes(section)) {
            return (
              <option value={section} key={section}>
                animal crossing &rarr; {section}
              </option>
            );
          } else if (ZELDA_SECTIONS.includes(section)) {
            return (
              <option value={section} key={section}>
                zelda &rarr; {section}
              </option>
            );
          }
          return <option key={section}>{section}</option>;
        })}
      </select>
    </Label>
  )
}