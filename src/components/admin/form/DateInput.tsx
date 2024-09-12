import { input } from "@themes/admin";
import Label from "./Label";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  defaultValue?: string;
};

export default function DateInput({
  label,
  name,
  defaultValue,
  ...inputProps
}: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="datetime-local"
        name={name}
        id={name}
        value={defaultValue}
        className={input({ type: "date" })}
        {...inputProps}
      />
    </>
  );
}
