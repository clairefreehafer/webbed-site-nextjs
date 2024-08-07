import Label from "./label";

type Props = {
  label: string;
  name: string;
  defaultValue?: number;
};

export default function NumberInput({ label, name, defaultValue }: Props) {
  return (
    <>
      <div className="border-r-2 border-white pr-4">
        <input
          type="number"
          name={name}
          id={name}
          className="p-input bg-input-bg text-shadow shadow-input w-full rounded-sm text-white"
          defaultValue={defaultValue}
        />
      </div>
      <Label htmlFor={name} align="left">
        {label}
      </Label>
    </>
  );
}
