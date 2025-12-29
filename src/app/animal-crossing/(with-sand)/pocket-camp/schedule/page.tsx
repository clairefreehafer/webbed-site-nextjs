import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import scheduleDataJson from "@/data/animal-crossing/pocket-camp-schedule.json";
import { ScheduleData } from "@/types/animal-crossing";

const scheduleData = scheduleDataJson as ScheduleData;

export default function Page() {
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/animal-crossing">animal crossing</Link>
        <span>/</span>
        <Link href="/animal-crossing/pocket-camp">pocket camp</Link>
        <span>/</span>
        <h2>schedule</h2>
      </div>

      {scheduleData.map(({ month, themes }) => (
        <Fragment key={month}>
          <h3>{month}</h3>
          {themes.map((theme) => (
            <Fragment key={theme.name}>
              <h4>{theme.name}</h4>
              <ul>
                {theme.campers.map((camper) => (
                  <li key={camper.name}>
                    <div
                      style={{
                        height: "3rem",
                        maxWidth: "3rem",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={`/images/animal-crossing/pocket-camp/stickers/${camper.name}.png`}
                        alt=""
                        fill
                        objectFit="contain"
                      />
                    </div>{" "}
                    {camper.name}
                    {camper.cookie && (
                      <div
                        style={{
                          height: "3rem",
                          maxWidth: "3rem",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={`/images/animal-crossing/pocket-camp/cookies/${camper.name}.png`}
                          alt=""
                          fill
                          objectFit="contain"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  );
}
