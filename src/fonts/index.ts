import { Inter, Love_Ya_Like_A_Sister, Pangolin, Press_Start_2P } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const loveYaLikeASister = Love_Ya_Like_A_Sister({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-love-ya-like-a-sister"
});

export const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pangolin",
})

export const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start-2p"
});