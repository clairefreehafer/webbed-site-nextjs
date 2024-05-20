import { useCallback, useMemo, useRef, useState } from "react";
import { Input, Label } from "./form";
import { Section } from "@prisma/client";
import { flexColumnCenter } from "@styles/layout";

function generateSectionsHierarchy(sections: (Section & { children: Section[] })[]) {
  let sectionsHierarchy: Record<string, any> = {};

  sections.forEach((section) => {
    const { name, parentName, children } = section;
    if (!parentName) {
      // top-level sections are returned first
      if (children.length) {
        sectionsHierarchy[name] = children.reduce((acc, child) => (
          { ...acc, [child.name]: {} }
        ), {});
      } else {
        sectionsHierarchy[name] = sectionsHierarchy[name] || {};
      }
    } else {
      if (Object.keys(sectionsHierarchy).includes(parentName)) {
        if (children.length) {
          // next are child sections with their own children
          sectionsHierarchy[parentName][name] = children.reduce((acc, child) => (
            { ...acc, [child.name]: {} }
          ), {});
        } else {
          // last are the leaves
          sectionsHierarchy[parentName][name] = sectionsHierarchy[parentName][name] || {}
        }
      }
    }
  });
  return sectionsHierarchy;
};

export default function SectionSelect(
  { defaultValue, sections }:
  { defaultValue: Section, sections: (Section & { children: Section[] })[] }
) {
  const sectionsHierarchy = useMemo(() => generateSectionsHierarchy(sections), [sections]);
  const defaultOptions = useMemo(() => {
    if (defaultValue) {
      const finalOptions: string[] = [defaultValue.name];
      let currentValue: string | null | undefined = defaultValue.parentName;

      while (currentValue) {
        finalOptions.unshift(currentValue);
        currentValue = sections.find((section) => section.name === currentValue)?.parentName;
      }
  
      return finalOptions;
    } else {
      return [];
    }
  }, [defaultValue]);

  const selectRefs = useRef<HTMLSelectElement[]>([]);

  const generateOptions = useCallback((changedLevel = 0) => {
    let currentLevel = { ...sectionsHierarchy };
    const levels = [];
    let levelIndex = 0;

    while (typeof currentLevel === "object" && Object.keys(currentLevel).length) {
      levels.push(Object.keys(currentLevel));

      // TODO: can we refactor this without losing readability?
      if (!selectRefs.current || !selectRefs.current.length) {
        // first render, before refs initialize
        if (defaultOptions[levelIndex]) {
          // use default values if available
          currentLevel = currentLevel[defaultOptions[levelIndex]];
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
  }, [sectionsHierarchy, selectRefs])

  const [currentOptions, setCurrentOptions] = useState(generateOptions());

  function handleChange(level: number) {
    setCurrentOptions(generateOptions(level));
  }

  return (
    <>
      <Label>
        section
      </Label>
      <div css={flexColumnCenter}>
        {currentOptions.map((optionsArr, i) => {
          return (
            <Input
              as="select"
              key={i}
              name={`section${i}`}
              onChange={() =>
              handleChange(i)}
              ref={(el) => {el && selectRefs.current.push(el)}}
              defaultValue={defaultOptions[i]}
            >
              {optionsArr.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Input>
          )
        })}
      </div>
    </>
    
  )
}