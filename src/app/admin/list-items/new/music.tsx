import SectionHeader from "@components/admin/form/FormSectionHeader";
import TextInput from "@components/admin/form/TextInput";

export default function NewMusicForm() {
  return (
    <>
      <SectionHeader>~~~ 🎶 ~~~</SectionHeader>
      <TextInput label="title" name="title" />
      <TextInput label="artist" name="artist" />
      <TextInput label="album" name="album" />
    </>
  );
}
