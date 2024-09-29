import Label from "./Label";
import { adminInput } from "@panda/recipes";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  defaultValue?: string;
  dateOnly?: boolean;
};

export default function DateInput({
  label,
  name,
  defaultValue,
  dateOnly = false,
  ...inputProps
}: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <input
        type={dateOnly ? "date" : "datetime-local"}
        name={name}
        id={name}
        value={defaultValue}
        className={adminInput({ type: "date" })}
        {...inputProps}
      />
    </>
  );
}
