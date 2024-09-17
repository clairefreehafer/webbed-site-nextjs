import { ListFormState, addList } from "@actions/list";
import AdminForm from "@components/admin/form";
import SubmitButton from "@components/admin/form/SubmitButton";
import TextInput from "@components/admin/form/TextInput";

const initialState: ListFormState = {};

export default function Page() {
  return (
    <AdminForm initialState={initialState} action={addList}>
      <TextInput label="name" name="name" />
      <SubmitButton>create list</SubmitButton>
    </AdminForm>
  );
}
