"use client";

import NewWebsiteForm from "./website";

export default function NewListItemPage({
  params: { listItemType },
}: {
  params: { listItemType: string };
}) {
  switch (listItemType) {
    case "website":
      return <NewWebsiteForm />;
  }

  return <>🚧 form for {listItemType} hasn&apos;t been made yet.</>;
}
