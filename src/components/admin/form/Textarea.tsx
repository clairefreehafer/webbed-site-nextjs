import { input } from "@themes/admin";
import Label from "./Label";

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
        className={input({ type: "textarea" })}
      />
    </>
  );
}
