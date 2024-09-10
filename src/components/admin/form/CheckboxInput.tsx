import { css } from "@panda/css";
import Label from "./Label";

const container = css({
  alignItems: "center",
  display: "flex",
  borderRight: "2px solid white",
  justifyContent: "flex-end",
  pr: "2rem",
});

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function CheckboxInput({ label, name, ...inputProps }: Props) {
  return (
    <>
      <div className={container}>
        <input
          type="checkbox"
          name={name}
          id={name}
          className={css({ height: "2rem", width: "2rem" })}
          {...inputProps}
        />
      </div>
      <Label htmlFor={name} align="left">
        {label}
      </Label>
    </>
  );
}
