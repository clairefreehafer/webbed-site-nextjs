import { FoodFormState, addFood } from "@actions/food";
import AdminForm from "@components/admin/form";
import Select from "@components/admin/form/Select";
import TextInput from "@components/admin/form/TextInput";
import { foodCategories } from "types/recipes";

const initialState: FoodFormState = {};

export default function Page() {
  return (
    <AdminForm
      submitButtonText="add food"
      initialState={initialState}
      action={addFood}
    >
      <TextInput label="name" name="name" />
      <Select name="category" label="category" options={foodCategories} />
    </AdminForm>
  );
}
