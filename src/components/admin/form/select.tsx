import { ChangeEventHandler } from "react";
import Label from "./label";

type Props = {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export default function Select({
  label,
  name,
  options,
  defaultValue,
  onChange,
}: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="p-input bg-neutral-800 text-white"
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </>
  );
}
