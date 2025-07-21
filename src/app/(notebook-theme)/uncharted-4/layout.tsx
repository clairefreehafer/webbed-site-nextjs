import "@/sass/notebook/uncharted-4.scss";

export async function generateMetadata() {
  return {
    title: "uncharted 4 — claire freehafer",
  };
}

export default function Layout({ children }: React.PropsWithChildren) {
  // TODO: background transformation
  return children;
}
