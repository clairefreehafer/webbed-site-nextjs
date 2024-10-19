"use client";

import { addRecipe } from "@actions/recipe";
import AdminForm, { AdminFormState } from "@components/admin/form";
import CheckboxInput from "@components/admin/form/CheckboxInput";
import SectionHeader from "@components/admin/form/FormSectionHeader";
import Select from "@components/admin/form/Select";
import TextInput from "@components/admin/form/TextInput";
import Textarea from "@components/admin/form/Textarea";
import { css } from "@panda/css";
import { Fragment, useState } from "react";
import { Ingredient, Recipe, Unit, foodCategories } from "types/recipes";

export type NewRecipeFormState = AdminFormState<{
  title?: Recipe["title"];
}>;

const initialState: NewRecipeFormState = {};

type Props = {
  recipe: Recipe;
};

// TODO:
//   - add ability to remove ingredients and instructions
//   - add recipe preview?
export default function NewRecipeForm({ recipe }: Props) {
  const [ingredients, setIngredients] = useState<Recipe["ingredients"]>([]);
  const [newFood, setNewFood] = useState<boolean[]>([]);
  const [instructions, setInstructions] = useState<Recipe["instructions"]>([]);

  function handleIngredientChange<K extends keyof Ingredient>(
    key: K,
    value: Ingredient[K],
    idx: number
  ) {
    const updatedIngredients = [...ingredients];
    updatedIngredients[idx][key] = value;
    setIngredients(updatedIngredients);
  }

  const { title, url } = recipe;

  return (
    <AdminForm
      submitButtonText="create recipe"
      initialState={initialState}
      action={addRecipe}
    >
      <TextInput name="title" label="title" value={title} required />
      <TextInput name="url" label="url" value={url} />

      <SectionHeader>~~~ INGREDIENTS ~~~</SectionHeader>
      <input
        type="hidden"
        name="ingredients"
        value={JSON.stringify(ingredients)}
        readOnly
      />
      {/*
      {recipe.ingredients.map(() => (

      ))} */}

      {ingredients.map(({ foodName, quantity, unit }, idx) => (
        <Fragment key={idx}>
          {newFood[idx] ? (
            <>
              <TextInput name="name" label="name" />
              <Select
                name="category"
                label="category"
                options={foodCategories}
              />
            </>
          ) : (
            <Select
              name={`foodName-${idx}`}
              label="food"
              options={foodOptions}
              value={foodName}
              onChange={(e) =>
                handleIngredientChange("foodName", e.target.value, idx)
              }
              defaultValue={undefined}
            />
          )}
          <CheckboxInput
            label="new food?"
            name="newFood"
            checked={newFood[idx]}
            onChange={() => {
              const updatedNewFood = [...newFood];
              updatedNewFood[idx] = !updatedNewFood[idx];
              setNewFood(updatedNewFood);
            }}
          />
          <TextInput
            name={`quantity-${idx}`}
            label="quantity"
            value={quantity}
            onChange={(e) =>
              handleIngredientChange("quantity", e.target.value, idx)
            }
          />
          <Select
            name={`unit-${idx}`}
            label="unit"
            options={Object.values(Unit)}
            value={unit}
            onChange={(e) =>
              handleIngredientChange("unit", e.target.value as Unit, idx)
            }
          />
          <SectionHeader>~~~</SectionHeader>
        </Fragment>
      ))}
      <button
        type="button"
        className={css({
          gridColumn: "span 2",
        })}
        onClick={() => {
          setIngredients((prevIngredients) => [
            ...prevIngredients,
            {
              quantity: "",
              unit: Unit.Count,
              foodName: "",
            },
          ]);
          setNewFood((prevNewFood) => [...prevNewFood, false]);
        }}
      >
        add ingredient
      </button>

      <SectionHeader>~~~ INSTRUCTIONS ~~~</SectionHeader>
      <input
        type="hidden"
        name="instructions"
        value={JSON.stringify(instructions)}
        readOnly
      />
      {instructions.map((instruction, idx) => (
        <Textarea
          key={idx}
          name={`instruction-${idx})`}
          label={`${idx + 1})`}
          value={instruction}
          onChange={(e) => {
            const updatedInstructions = [...instructions];
            updatedInstructions[idx] = e.target.value;
            setInstructions(updatedInstructions);
          }}
        />
      ))}
      <button
        type="button"
        onClick={() =>
          setInstructions((prevInstructions) => [...prevInstructions, ""])
        }
        className={css({
          gridColumn: "span 2",
        })}
      >
        add instruction
      </button>
    </AdminForm>
  );
}
