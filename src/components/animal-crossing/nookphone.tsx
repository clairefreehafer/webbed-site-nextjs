"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import nookphoneConfigJson from "@/data/animal-crossing/nookphone.json";
import { NookphoneConfig } from "@/types/animal-crossing";
import { deslugify } from "@/utils/client";

/*
 * SECTION.........APP
 * ~~~~~~~         ~~~
 * RESIDENTS.......BEST FRIENDS ✅
 * VISITORS........PASSPORT ✅
 * AVALAR..........MAP ✅
 * EVENTS..........CALL RESIDENT ✅
 * DREAMS..........ISLAND LIFE 101 ✅
 * INTERIORS.......HAPPY HOME NETWORK
 * ONLINE..........CHAT LOG ❓
 * RANDOM..........RESCUE SERVICE
 * ALL.............CAMERA ❓
 */

// today? gifs?

const nookphoneConfig: NookphoneConfig[] = nookphoneConfigJson;

const DEFAULT_TEXT = "photo albums";

export default function NookPhone() {
  const [time, setTime] = useState("");
  const [displayText, setDisplayText] = useState(DEFAULT_TEXT);

  useEffect(() => {
    if (!time) {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    }
  }, [time]);

  function handleHover(text: string) {
    setDisplayText(text);
  }

  return (
    <div className="nookphone">
      <div className="row">
        <Image
          src="/images/animal-crossing/new-horizons/nookphone/signal.png"
          className="symbols signal"
          width={42}
          height={42}
          alt=""
        />
        <p id="time">{time}</p>
        <Image
          src="/images/animal-crossing/new-horizons/nookphone/location.png"
          className="symbols location"
          width={88}
          height={32}
          alt=""
        />
      </div>

      <p className="link-title">{displayText}</p>

      <div className="apps">
        {nookphoneConfig.map((app) => (
          <Link
            key={app.slug}
            href={`/animal-crossing/new-horizons/${app.slug}`}
            className={`${app.icon} app`}
            onMouseOver={() => handleHover(deslugify(app.slug))}
          >
            <Image
              src={`/images/animal-crossing/new-horizons/nookphone/${app.icon}.png`}
              fill
              alt={deslugify(app.slug)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
