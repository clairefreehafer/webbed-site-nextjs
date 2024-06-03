import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";
import Label from "./label";

type Props = {
  label?: string;
  name: string;
  options: string[];
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { label, name, options, defaultValue, onChange },
  ref,
) {
  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="p-input mb-4 bg-neutral-800 text-white last-of-type:mb-0"
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
