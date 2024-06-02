import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function SectionHeader({ children }: Props) {
  return (
    <h5 className="col-start-[span_2] text-center text-2xl uppercase">
      {children}
    </h5>
  );
}
