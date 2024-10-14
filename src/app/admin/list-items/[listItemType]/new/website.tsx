import { WebsiteListItemFormState, addListItem } from "@actions/listItem";
import AdminForm from "@components/admin/form";
import SectionHeader from "@components/admin/form/FormSectionHeader";
import TextInput from "@components/admin/form/TextInput";
import { WebsiteListObject } from "types/lists";

const initialState: WebsiteListItemFormState = {};

export default function NewWebsiteForm({
  title,
  url,
}: Partial<WebsiteListObject>) {
  return (
    <AdminForm
      submitButtonText="+ add website"
      initialState={initialState}
      action={addListItem}
    >
      <input type="hidden" name="type" value="website" readOnly />
      <SectionHeader>~~~ 💻 ~~~</SectionHeader>
      <TextInput label="title" name="title" defaultValue={title} />
      <TextInput label="url" name="url" defaultValue={url} />
    </AdminForm>
  );
}