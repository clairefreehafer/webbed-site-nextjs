import { input } from "@themes/admin";
import Label from "./Label";
import { css } from "@panda/css";

const container = css({
  borderRight: "2px solid white",
  pr: "2rem",
});

type Props = {
  label: string;
  name: string;
  defaultValue?: number;
};

export default function NumberInput({ label, name, defaultValue }: Props) {
  return (
    <>
      <div className={container}>
        <input
          type="number"
          name={name}
          id={name}
          className={input({ type: "number" })}
          defaultValue={defaultValue}
        />
      </div>
      <Label htmlFor={name} align="left">
        {label}
      </Label>
    </>
  );
}