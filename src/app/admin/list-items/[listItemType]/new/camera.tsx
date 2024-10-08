import SectionHeader from "@components/admin/form/FormSectionHeader";
import Select from "@components/admin/form/Select";
import TextInput from "@components/admin/form/TextInput";
import { cameraMediums } from "types/lists";

export default function CameraForm() {
  return (
    <>
      <SectionHeader>~~~ 📸 ~~~</SectionHeader>
      <TextInput label="make" name="make" />
      <TextInput label="model" name="model" />
      <Select label="medium" name="medium" options={cameraMediums} />
    </>
  );
}
