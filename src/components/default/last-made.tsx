"use client";
import { useEffect, useState } from "react";

// https://dev.to/madsstoumann/showing-time-ago-in-a-social-feed-using-intlrelativetimeformat-5ceo
function displayTimeAgo(dateString: string) {
  const date = new Date(dateString);

  let value: string;
  let chipOpacity = 1;
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (years > 0) {
    value = rtf.format(0 - years, "year");
    chipOpacity = 0.25;
  } else if (months > 0) {
    value = rtf.format(0 - months, "month");
    // 0.7-0.5
    chipOpacity = 0.7 - months / 10;
  } else if (days > 6) {
    value = rtf.format(0 - Math.round(days / 7), "week");
    // 0.8-0.7
    console.log(Math.round(days / 7) / 10);
    chipOpacity = 0.8 - (Math.round(days / 7) / 100) * 2;
  } else {
    value = rtf.format(0 - days, "day");
    // 1-0.9
    chipOpacity = 1 - days / 100;
  }
  return { value, chipOpacity };
}

export default function LastMade({ lastMade }: { lastMade?: string }) {
  const [timeAgo, setTimeAgo] = useState("");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (lastMade) {
      const { value, chipOpacity } = displayTimeAgo(lastMade);

      if (!timeAgo) {
        setTimeAgo(value);
      }
      if (!opacity) {
        setOpacity(chipOpacity);
      }
    }
  }, [lastMade, timeAgo, displayTimeAgo, opacity]);

  if (!lastMade) {
    return null;
  }
  return (
    <span className="last-made" title="last made" style={{ opacity }}>
      {timeAgo}
    </span>
  );
}
