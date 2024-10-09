import {
  WebsiteListItemFormState,
  editWebsiteListItem,
} from "@actions/listItem";
import AdminForm from "@components/admin/form";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";

type Props = WebsiteListItemFormState & {
  listSelect: React.ReactNode;
  lists: string[];
};

export default function EditWebsiteForm({ id, title, url, listSelect }: Props) {
  const initialState: WebsiteListItemFormState = { id, title, url };

  return (
    <AdminForm action={editWebsiteListItem} initialState={initialState}>
      <input type="hidden" name="id" defaultValue={id} readOnly />
      <input type="hidden" name="type" defaultValue="website" readOnly />

      <TextInput label="title" name="title" defaultValue={title} />
      <TextInput label="url" name="url" defaultValue={url} />

      {listSelect}

      <SubmitButton>update website</SubmitButton>
    </AdminForm>
  );
}
