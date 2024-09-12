import {
  Cutive_Mono,
  Inter,
  Love_Ya_Like_A_Sister,
  PT_Mono,
  Pangolin,
  Press_Start_2P,
} from "next/font/google";

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
