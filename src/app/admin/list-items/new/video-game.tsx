import SectionHeader from "@components/admin/form/FormSectionHeader";
import NumberInput from "@components/admin/form/NumberInput";
import TextInput from "@components/admin/form/TextInput";

export default function NewVideoGameForm() {
  return (
    <>
      <SectionHeader>~~~ 🎮 ~~~</SectionHeader>
      <TextInput label="title" name="title" />
      <NumberInput label="year" name="year" />
    </>
  );
}
