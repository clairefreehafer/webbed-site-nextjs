"use client";
 
export default function Error(
  { error }: { error: Error }
) {
  return (
    <pre css={{ margin: "1rem" }}>❌ {error.message}</pre>
  );
}