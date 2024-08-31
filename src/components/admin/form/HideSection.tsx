import { ReactNode } from "react";
import { formGridClassNames } from "./index";

type Props = {
  when: boolean;
  children: ReactNode;
};

const hiddenClassNames = "h-0 overflow-hidden visibility-hidden";

export default function HideSection({ when, children }: Props) {
  return (
    <div
      className={`${formGridClassNames} col-start-[span_2] w-full ${when && hiddenClassNames}`}
    >
      {children}
    </div>
  );
}
