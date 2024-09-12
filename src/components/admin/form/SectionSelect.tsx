"use client";

import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { Prisma } from "@prisma/client";
import { getSectionsForHierarchy } from "@utils/prisma/section";
import { getAlbumData } from "@utils/prisma/album";
import Label from "./Label";
import Select from "./Select";
import { css } from "@panda/css";

const container = css({
  alignItems: "middle",
  display: "flex",
  flexDir: "column",
  gap: "1rem",
});

export type SectionSelectProps = {
  defaultValue?: Prisma.PromiseReturnType<typeof getAlbumData>["section"];
  sections: Prisma.PromiseReturnType<typeof getSectionsForHierarchy>;
  onChange?: (section: string) => void;
};

// TODO: FIX
function generateSectionsHierarchy(sections: SectionSelectProps["sections"]) {
  const hashTable = Object.create(null);

  // generate entry for each section in our hash table
  sections.forEach((aData) => (hashTable[aData.name] = {}));

  const sectionsHierarchy: Record<string, any> = {};
  sections.forEach((aData) => {
    if (aData.parentName) {
      // for child sections, update our hash table to include child under its parent and its own children
      hashTable[aData.parentName] = {
        ...hashTable[aData.parentName],
        [aData.name]: hashTable[aData.name],
      };
    } else {
      // for top-level sections, add them to our final object.
      sectionsHierarchy[aData.name] = {};
    }
  });
  // populate our final object using the hash table.
  for (let section in sectionsHierarchy) {
    sectionsHierarchy[section] = hashTable[section];
  }

  return sectionsHierarchy;
}

export default function SectionSelect({
  defaultValue,
  sections,
  onChange,
}: SectionSelectProps) {
  const sectionsHierarchy = useMemo(
    () => generateSectionsHierarchy(sections),
    [sections],
  );
  const defaultOptions = useMemo(() => {
    if (defaultValue) {
      const finalOptions: string[] = [defaultValue.name];
      let currentValue: string | null | undefined = defaultValue.parentName;

      while (currentValue) {
        finalOptions.unshift(currentValue);
        currentValue = sections.find(
          (section) => section.name === currentValue,
        )?.parentName;
      }

      return finalOptions;
    } else {
      return [];
    }
  }, [defaultValue, sections]);

  const selectRefs = useRef<HTMLSelectElement[]>([]);

  const generateOptions = useCallback(
    (changedLevel = 0) => {
      let currentLevel = { ...sectionsHierarchy };
      const levels = [];
      let levelIndex = 0;

      while (
        typeof currentLevel === "object" &&
        Object.keys(currentLevel).length
      ) {
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
    },
    [sectionsHierarchy, selectRefs, defaultOptions],
  );

  const [currentOptions, setCurrentOptions] = useState(generateOptions);

  function handleChange(e: ChangeEvent<HTMLSelectElement>, level: number) {
    setCurrentOptions(generateOptions(level));

    if (level === 0) {
      onChange?.(e.target.value);
    }
  }

  return (
    <>
      <Label htmlFor="section0">section</Label>
      <div className={container}>
        {currentOptions.map((optionsArr, i) => {
          return (
            <Select
              key={i}
              name={`section${i}`}
              onChange={(e) => handleChange(e, i)}
              ref={(el) => {
                el && selectRefs.current.push(el);
              }}
              defaultValue={defaultOptions[i]}
              options={optionsArr}
            />
          );
        })}
      </div>
    </>
  );
}
