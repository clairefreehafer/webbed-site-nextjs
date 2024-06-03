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
        className="p-input bg-neutral-800 text-white"
        required={required}
      />
    </>
  );
}
