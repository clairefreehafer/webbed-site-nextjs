import Label from "./Label";
import { css } from "@panda/css";
import { adminInput } from "@panda/recipes";

const container = css({
  borderRight: "2px solid white",
  pr: "2rem",
});

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function NumberInput({ label, name, ...inputProps }: Props) {
  return (
    <>
      <div className={container}>
        <input
          {...inputProps}
          type="number"
          name={name}
          id={name}
          className={adminInput({ type: "number" })}
        />
      </div>
      <Label htmlFor={name} align="left">
        {label}
      </Label>
    </>
  );
}
