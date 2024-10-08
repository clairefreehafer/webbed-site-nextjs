import DateInput from "@components/admin/form/DateInput";
import SectionHeader from "@components/admin/form/FormSectionHeader";
import TextInput from "@components/admin/form/TextInput";

export default function PodcastForm() {
  return (
    <>
      <SectionHeader>~~~ 🎙️ ~~~</SectionHeader>
      <TextInput label="podcast" name="podcast" />
      <TextInput label="episode" name="episode" />
      <DateInput dateOnly label="date" name="date" />
    </>
  );
}
