import { adminInput } from "@panda/recipes";
import Label from "./Label";

type Props = Omit<
  React.ComponentProps<"input">,
  "name" | "type" | "id" | "className"
> & {
  label: string;
  name: string;
};

export default function TextInput({ label, name, ...inputProps }: Props) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="text"
        name={name}
        id={name}
        className={adminInput({ type: "text" })}
        {...inputProps}
      />
    </>
  );
}
