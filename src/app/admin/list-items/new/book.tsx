import SectionHeader from "@components/admin/form/FormSectionHeader";
import NumberInput from "@components/admin/form/NumberInput";
import TextInput from "@components/admin/form/TextInput";

export default function NewBookForm() {
  return (
    <>
      <SectionHeader>~~~ 📖 ~~~</SectionHeader>
      <TextInput label="title" name="title" />
      <TextInput label="author" name="author" />
      <NumberInput label="published year" name="year" />
      <TextInput label="open library ID" name="openLibraryId" />
    </>
  );
}
