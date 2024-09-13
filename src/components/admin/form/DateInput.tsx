import Label from "./Label";
import { adminInput } from "@panda/recipes";

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
        className={adminInput({ type: "date" })}
        {...inputProps}
      />
    </>
  );
}
