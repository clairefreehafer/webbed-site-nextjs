"use client";
import { useEffect, useState } from "react";

// https://dev.to/madsstoumann/showing-time-ago-in-a-social-feed-using-intlrelativetimeformat-5ceo
function displayTimeAgo(date: Date): string {
  let value: string;
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (years > 0) {
    value = rtf.format(0 - years, "year");
  } else if (months > 0) {
    value = rtf.format(0 - months, "month");
  } else if (days > 6) {
    value = rtf.format(0 - Math.round(days / 7), "week");
  } else {
    value = rtf.format(0 - days, "day");
  }
  return value;
}

export default function LastMade({ lastMade }: { lastMade?: Date }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (lastMade && !timeAgo) {
      setTimeAgo(displayTimeAgo(lastMade));
    }
  }, [lastMade, timeAgo, displayTimeAgo]);

  if (!lastMade) {
    return null;
  }
  return (
    <span className="last-made" title="last made">
      {timeAgo}
    </span>
  );
}
