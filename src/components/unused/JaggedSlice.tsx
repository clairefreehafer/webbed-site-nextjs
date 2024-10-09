import { jaggedBorder } from "@panda/patterns";

export default function JaggedSlice({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={jaggedBorder({
        side: "bottom",
        jagSize: 30,
        alignItems: "center",
        boxShadow: "inset 0rem 1rem 1rem -1rem black",
        display: "flex",
        flexDir: "column",
        justifyContent: "center",
        width: "100%",
      })}
    >
      {children}
    </div>
  );
}
