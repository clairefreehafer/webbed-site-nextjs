import Label from "./label";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function CheckboxInput({ label, name, ...inputProps }: Props) {
  return (
    <>
      <div className="flex justify-end border-r-2 border-white p-4 text-right">
        <input
          type="checkbox"
          name={name}
          id={name}
          className="h-8 w-8"
          {...inputProps}
        />
      </div>
      <Label htmlFor={name} align="left">
        {label}
      </Label>
    </>
  );
}
