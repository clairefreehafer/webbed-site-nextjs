import {
  Caveat,
  Cutive_Mono,
  Inter,
  Love_Ya_Like_A_Sister,
  PT_Mono,
  Pangolin,
  Press_Start_2P,
  Redacted_Script,
  Ribeye_Marrow,
  Silkscreen,
} from "next/font/google";

export const caveat = Caveat({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

/** typewriter */
export const cutiveMono = Cutive_Mono({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-cutive-mono",
  weight: "400",
});

export const inter = Inter({ subsets: ["latin"] });

/** serif handwriting */
export const loveYaLikeASister = Love_Ya_Like_A_Sister({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-love-ya-like-a-sister",
  weight: "400",
});

/** sans-serif handwriting */
export const pangolin = Pangolin({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-pangolin",
  weight: "400",
});

/** 8-bit */
export const pressStart2P = Press_Start_2P({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start-2p",
});

/** terminal */
export const ptMono = PT_Mono({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pt-mono",
});

/** text background/underline */
export const redactedScript = Redacted_Script({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-redacted-script",
});

/** bubbly serif */
export const ribeye = Ribeye_Marrow({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ribeye-marrow",
});

/** uppercase pixel */
// export const silkscreen = Silkscreen({
//   display: "swap",
//   preload: true,
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-silkscreen",
// })
