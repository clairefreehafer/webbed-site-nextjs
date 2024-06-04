import { Theme } from "@styles/theme";

const wiggleBox = "absolute border-white opacity-0 top-0 h-full w-full";
const box1 =
  "border-t-4 border-r-[3px] border-b-[5px] border-l-[3px] rounded-wiggle1 group-hover:animate-wiggle-box";
const box2 =
  "border-r-[3px] border-b-[5px] border-l-[3px] border-t-4 rounded-wiggle2 group-hover:animate-wiggle-box group-hover:delay-wiggle-box-2";
const box3 =
  "border-b-[5px] border-l-[3px] border-t-4 border-r-[3px] rounded-wiggle3 group-hover:animate-wiggle-box group-hover:delay-wiggle-box-3";

export default function WiggleBox({ theme }: { theme: Theme }) {
  if (theme !== "notebook") {
    return null;
  }

  return (
    <>
      <div className={`${wiggleBox} ${box1}`} />
      <div className={`${wiggleBox} ${box2}`} />
      <div className={`${wiggleBox} ${box3}`} />
    </>
  );
}
