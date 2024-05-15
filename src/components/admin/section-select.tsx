import { useCallback, useMemo, useRef, useState } from "react";
import { Input, Label } from "./form";

function createNestedObject(base: Record<any, any>, keys: string[]) {
  for (let i = 0; i < keys.length; i++) {
    base = base[keys[i]] = base[keys[i]] || {};
  }
};

export default function SectionSelect(
  { defaultValue, sections }:
  { defaultValue: string[], sections: string[][] }
) {
  const sectionsHeirarchy = useMemo(() => {
    const sectionsHeirarchy: any = {};

    sections.forEach((sectionArr) => {
      createNestedObject(sectionsHeirarchy, sectionArr)
    });

    return sectionsHeirarchy;
  }, [sections]);

  const selectRefs = useRef<HTMLSelectElement[]>([]);

  const generateOptions = useCallback((changedLevel = 0) => {
    let currentLevel = { ...sectionsHeirarchy };
    const levels = [];
    let levelIndex = 0;

    while (typeof currentLevel === "object" && Object.keys(currentLevel).length) {
      levels.push(Object.keys(currentLevel));

      // TODO: can we refactor this without losing readability?
      if (!selectRefs.current || !selectRefs.current.length) {
        // first render, before refs initialize
        if (defaultValue[levelIndex]) {
          // use default values if available
          currentLevel = currentLevel[defaultValue[levelIndex]];
        } else {
          // otherwise fall back to first in each list
          currentLevel = currentLevel[Object.keys(currentLevel)[0]];
        }
      } else if (levelIndex <= changedLevel) {
        // for the level that changed and above, use the values in the inputs
        currentLevel = currentLevel[selectRefs.current[levelIndex].value];
      } else {
        // for everything below the changed level, use defaults.
        currentLevel = currentLevel[Object.keys(currentLevel)[0]];
      }
      levelIndex++;
    }

    return levels;
  }, [sectionsHeirarchy, selectRefs])

  const [currentOptions, setCurrentOptions] = useState(generateOptions());

  function handleChange(level: number) {
    setCurrentOptions(generateOptions(level));
  }

  return (
    <Label>
      select existing section
      {currentOptions.map((optionsArr, i) => {
        return (
          <select
            key={i}
            name={`section${i}`}
            onChange={() =>
            handleChange(i)}
            ref={(el) => {el && selectRefs.current.push(el)}}
            defaultValue={defaultValue[i]}
          >
            {optionsArr.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        )
      })}
      or add new section (comma separated)
      <Input
        type="text"
        name="section"
        defaultValue={defaultValue.join((","))}
      />
    </Label>
  )
}