import Label from "./Label";
import { adminInput } from "@panda/recipes";

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
};

export default function Textarea({ name, label, ...textareaProps }: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        {...textareaProps}
        name={name}
        id={name}
        className={adminInput({ type: "textarea" })}
      />
    </>
  );
}
