import { css, cx } from "@panda/css";
import { input } from "@styles/admin";
import { ReactNode } from "react";

const radio = cx(
  "peer",
  css({
    position: "absolute",
    height: 0,
    opacity: 0,
    width: 0,
  })
);

const option = css({
  alignItems: "center",
  aspectRatio: "1/1",
  border: "4px dashed transparent",
  display: "flex",
  justifyContent: "center",
  _peerChecked: { borderColor: "white" },
});

type RadioInputProps = {
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: ReactNode;
};

export function RadioInput({
  name,
  value,
  defaultChecked,
  children,
}: RadioInputProps) {
  return (
    <label key={value}>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className={radio}
      />
      <div className={option}>{children}</div>
    </label>
  );
}
//"bg-input-bg shadow-input p-input col-start-[span_2] mb-4 flex w-full rounded-sm text-white"

const options = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 5rem)",
  gridTemplateRows: "5rem",
  overflowX: "scroll",
});

type RadioFieldsetProps = {
  legend: string;
  children: ReactNode;
};

export default function RadioFieldset({
  legend,
  children,
}: RadioFieldsetProps) {
  return (
    <fieldset className={input({ type: "radioFieldset" })}>
      <legend className={css({ textTransform: "uppercase" })}>{legend}</legend>

      <div className={options}>{children}</div>
    </fieldset>
  );
}
