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
      
      if (!selectRefs.current ||
          !selectRefs.current.length ||
          levelIndex > changedLevel
      ) {
        currentLevel = currentLevel[Object.keys(currentLevel)[0]]
      } else {
        currentLevel = currentLevel[selectRefs.current[levelIndex].value];
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
            onChange={() =>
            handleChange(i)}
            ref={(el) => {el && selectRefs.current.push(el)}}
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