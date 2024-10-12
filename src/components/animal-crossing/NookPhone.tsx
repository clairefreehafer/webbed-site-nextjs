import { css } from "@panda/css";
import Image from "next/image";

export default function NookPhone() {
  return (
    <nav
      className={css({
        backgroundColor: "uiBackground",
        borderRadius: "5rem",
        fontFamily: "fotSeuratProB",
        p: "3rem",
      })}
    >
      <div
        className={css({
          alignItems: "flex-start",
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <Image
          src="/images/animal-crossing/nookphone/signal.png"
          alt=""
          width="88"
          height="32"
        />
        {new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
        <Image
          src="/images/animal-crossing/nookphone/location.png"
          alt=""
          width="42"
          height="42"
        />
      </div>
      nookphone
    </nav>
  );
}
