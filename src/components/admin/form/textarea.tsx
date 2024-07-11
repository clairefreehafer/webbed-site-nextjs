import { inputStyles } from ".";
import Label from "./label";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
};

export default function Textarea({ name, label, defaultValue }: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`${inputStyles} p-2 text-lg`}
      />
    </>
  );
}
