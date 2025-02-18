// https://dev.to/madsstoumann/showing-time-ago-in-a-social-feed-using-intlrelativetimeformat-5ceo
function timeAgo(date: Date) {
  let value;
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
  } else {
    value = rtf.format(0 - days, "day");
  }
  // else if (hours > 0) {
  //   value = rtf.format(0 - hours, "hour");
  // } else if (minutes > 0) {
  //   value = rtf.format(0 - minutes, "minute");
  // } else {
  //   value = rtf.format(0 - diff, "second");
  // }
  return value;
}

export default function LastMade({ lastMade }: { lastMade?: Date }) {
  if (!lastMade) {
    return null;
  }
  return (
    <span className="last-made" title="last made">
      {timeAgo(lastMade)}
    </span>
  );
}
