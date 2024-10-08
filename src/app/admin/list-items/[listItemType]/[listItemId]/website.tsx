import {
  WebsiteListItemFormState,
  editWebsiteListItem,
} from "@actions/listItem";
import AdminForm from "@components/admin/form";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";
import { WebsiteListObject } from "types/lists";

export default function EditWebsiteForm({
  id,
  title,
  url,
}: WebsiteListItemFormState) {
  const initialState: WebsiteListItemFormState = { id, title, url };

  return (
    <AdminForm action={editWebsiteListItem} initialState={initialState}>
      <input type="hidden" name="id" defaultValue={id} readOnly />
      <input type="hidden" name="type" defaultValue="website" readOnly />

      <TextInput label="title" name="title" defaultValue={title} />
      <TextInput label="url" name="url" defaultValue={url} />

      <SubmitButton>update website</SubmitButton>
    </AdminForm>
  );
}
