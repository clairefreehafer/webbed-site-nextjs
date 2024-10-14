import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";
import Label from "./Label";
import { adminInput } from "@panda/recipes";

type Props = React.InputHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  name: string;
  options: (string | null)[] | readonly (string | null)[];
};

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { label, name, options, ...selectProps },
  ref
) {
  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <select
        {...selectProps}
        id={name}
        name={name}
        className={adminInput({ type: "select" })}
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
