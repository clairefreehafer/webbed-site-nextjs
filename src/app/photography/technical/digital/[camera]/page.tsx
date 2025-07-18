export const dynamicParams = false;

// const DIGITAL_CAMERAS = [
//   "fujifilm xt2",
//   "canon rebel xs",
//   "canon eos 5d",
//   "google pixel 4",
//   "samsung galaxy s5",
//   "samsung galaxy s3",
//   "apple iphone 4",
//   "panasonic lumix dmc-fs1",
//   "apple ipad mini",
//   "apple ipad air",
// ] as const;

export async function generateStaticParams() {
  return [{ camera: "fujifilm-xt2" }];
}

export default function Page() {
  return null;
}
