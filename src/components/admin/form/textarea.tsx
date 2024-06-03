import Label from "./label";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
};

export default function Textarea({ name, label, defaultValue }: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="p-input bg-neutral-800 text-white"
      />
    </>
  );
}
