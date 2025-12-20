import "@/sass/default/library.scss";

import { PropsWithChildren } from "react";

import { updateShelvesJson } from "@/utils/library";

export default async function Layout({ children }: PropsWithChildren) {
  await updateShelvesJson();

  return children;
}
