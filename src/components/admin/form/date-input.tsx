import Label from "./label";

type Props = {
  label: string;
  name: string;
  defaultValue?: string;
  readOnly?: boolean;
};

export default function DateInput({
  label,
  name,
  defaultValue,
  readOnly,
}: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="datetime-local"
        name={name}
        id={name}
        value={defaultValue}
        readOnly={readOnly}
        className="p-input bg-neutral-800 text-white"
      />
    </>
  );
}
