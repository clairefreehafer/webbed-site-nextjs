"use client";

export default function Error({ error }: { error: Error }) {
  return <pre className="m-4 whitespace-pre-wrap">❌ {error.message}</pre>;
}
