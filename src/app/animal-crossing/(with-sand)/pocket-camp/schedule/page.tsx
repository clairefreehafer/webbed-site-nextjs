import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import scheduleDataJson from "@/data/animal-crossing/pocket-camp-schedule.json";
import { ScheduleData } from "@/types/animal-crossing";

export const metadata: Metadata = {
  title: "pocket camp schedule",
};

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
          <h3
            style={{ fontFamily: "var(--font-fink-heavy)", fontSize: "2rem" }}
          >
            {month}
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {themes.map((theme) => (
              <div
                key={theme.name}
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <h4>{theme.name}</h4>
                <ul>
                  {theme.campers.map((camper) => (
                    <li
                      key={camper.name}
                      style={{
                        alignItems: "center",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          height: "3rem",
                          width: "3rem",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={`/images/animal-crossing/pocket-camp/stickers/${camper.name}.png`}
                          alt=""
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>{" "}
                      {camper.name}
                      {camper.cookie && (
                        <div
                          style={{
                            height: "3rem",
                            width: "3rem",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={`/images/animal-crossing/pocket-camp/cookies/${camper.name}.png`}
                            alt=""
                            fill
                            style={{ objectFit: "contain" }}
                            title={camper.cookie}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
}
