import { inputStyles } from "./index";
import Label from "./label";

type Props = {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
};

export default function TextInput({
  label,
  name,
  defaultValue,
  required = false,
}: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="text"
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="bg-input-bg text-shadow shadow-input p-input mb-4 rounded-sm text-white last-of-type:mb-0"
        required={required}
      />
    </>
  );
}
