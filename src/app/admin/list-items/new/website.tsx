import SectionHeader from "@components/admin/form/FormSectionHeader";
import TextInput from "@components/admin/form/TextInput";

export default function NewWebsiteForm() {
  return (
    <>
      <SectionHeader>~~~ 💻 ~~~</SectionHeader>
      <TextInput label="title" name="title" />
      <TextInput label="url" name="url" />
    </>
  );
}
