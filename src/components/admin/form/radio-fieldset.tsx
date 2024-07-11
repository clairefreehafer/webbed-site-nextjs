import { ReactNode } from "react";

type RadioInputProps = {
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: ReactNode;
};

export function RadioInput({
  name,
  value,
  defaultChecked,
  children,
}: RadioInputProps) {
  return (
    <label key={value}>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer absolute h-0 w-0 opacity-0"
      />
      <div className="items-middle flex h-full w-full justify-center border-4 border-dashed border-transparent peer-checked:border-white">
        {children}
      </div>
    </label>
  );
}

type RadioFieldsetProps = {
  legend: string;
  children: ReactNode;
};

export default function RadioFieldset({
  legend,
  children,
}: RadioFieldsetProps) {
  return (
    <fieldset className="bg-input-bg shadow-input p-input col-start-[span_2] mb-4 flex w-full rounded-sm text-white">
      <legend className="uppercase">{legend}</legend>

      <div className="grid w-full grid-cols-[repeat(auto-fill,_5rem)] grid-rows-[5rem]">
        {children}
      </div>
    </fieldset>
  );
}
