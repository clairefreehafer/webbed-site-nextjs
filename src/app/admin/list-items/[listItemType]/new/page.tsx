"use client";

import NewWebsiteForm from "./website";

export default function Page({
  params: { listItemType },
}: {
  params: { listItemType: string };
}) {
  switch (listItemType) {
    case "website":
      return <NewWebsiteForm />;
  }
}
