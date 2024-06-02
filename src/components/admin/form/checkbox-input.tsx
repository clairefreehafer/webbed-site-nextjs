import { ChangeEventHandler } from "react";
import Label from "./label";

type Props = {
  label: string;
  checked?: boolean;
  name: string;
  onChange?: ChangeEventHandler;
};

export default function CheckboxInput({
  label,
  checked,
  name,
  onChange,
}: Props) {
  return (
    <>
      <div className="flex justify-end border-r-2 border-white p-4 text-right">
        <input
          type="checkbox"
          checked={checked}
          name={name}
          id={name}
          onChange={onChange}
          className="h-8 w-8"
        />
      </div>
      <Label htmlFor={name} align="left">
        {label}
      </Label>
    </>
  );
}
