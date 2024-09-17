import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";
import Label from "./Label";
import { adminInput } from "@panda/recipes";

type Props = {
  label?: string;
  name: string;
  options: string[] | readonly string[];
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { label, name, options, defaultValue, onChange },
  ref
) {
  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={adminInput({ type: "select" })}
        onChange={onChange}
        ref={ref}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </>
  );
});

export default Select;
