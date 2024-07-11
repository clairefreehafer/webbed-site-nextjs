import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";
import Label from "./label";
import { inputStyles } from "./index";

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
  console.log(inputStyles);
  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="bg-input-bg text-shadow shadow-input p-input mb-4 rounded-sm text-white last-of-type:mb-0"
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
