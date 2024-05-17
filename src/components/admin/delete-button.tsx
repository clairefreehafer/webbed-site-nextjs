"use client";

import { useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      ❌
    </button>
  )
}

export default function DeleteButton(
  { serverAction, value }:
  { serverAction: (formData: FormData) => void, value: string | number }
) {
  function action(formData: FormData) {
    if (confirm(`are you sure you want to delete "${value}"?`)) {
      serverAction(formData);
    }
  }

  return (
    <form action={action}>
      <input type="hidden" value={value} name="value" />
      <Button />
    </form>
  );
}