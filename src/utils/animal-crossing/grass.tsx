"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { GRASS_BACKGROUND_COLORS, GrassShape } from "@/types/animal-crossing";

import { getGrassDateRange } from ".";

type GrassState = {
  date: Date;
  shape: GrassShape;
};

type GrassContext = {
  setGrass: (grass: GrassState) => void;
};

const GrassContext = createContext<GrassContext>({
  setGrass: () => {},
});

export const GrassContextProvider = ({ children }: React.PropsWithChildren) => {
  const [grass, setGrass] = useState<GrassState>({
    date: new Date(),
    shape: "square",
  });

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const grassDateRange = getGrassDateRange(grass.date);
    body.style.backgroundColor = GRASS_BACKGROUND_COLORS[grassDateRange];
    body.style.backgroundImage = `url("/images/animal-crossing/grass/${grass.shape}_${grassDateRange}.png")`;
  }, [grass]);

  return (
    <GrassContext.Provider value={{ setGrass }}>
      {children}
    </GrassContext.Provider>
  );
};

export const Grass = ({
  date = new Date(),
  shape = "square",
}: Partial<GrassState>) => {
  const { setGrass } = useContext(GrassContext);

  useEffect(() => {
    setGrass({ date, shape });
  }, [date, shape, setGrass]);

  return null;
};
