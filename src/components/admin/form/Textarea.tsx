import Label from "./Label";
import { adminInput } from "@panda/recipes";

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
        className={adminInput({ type: "textarea" })}
      />
    </>
  );
}
