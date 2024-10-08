import SectionHeader from "@components/admin/form/FormSectionHeader";
import NumberInput from "@components/admin/form/NumberInput";
import TextInput from "@components/admin/form/TextInput";
import { BookListObject } from "types/lists";

export default function BookForm({
  title,
  author,
  year,
  openLibraryId,
}: Partial<BookListObject>) {
  return (
    <>
      <SectionHeader>~~~ 📖 ~~~</SectionHeader>
      <TextInput label="title" name="title" defaultValue={title} />
      <TextInput label="author" name="author" defaultValue={author} />
      <NumberInput label="published year" name="year" defaultValue={year} />
      <TextInput
        label="open library ID"
        name="openLibraryId"
        defaultValue={openLibraryId}
      />
    </>
  );
}
