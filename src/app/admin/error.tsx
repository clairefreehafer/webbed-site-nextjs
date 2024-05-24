"use client";
 
export default function Error(
  { error }: { error: Error }
) {
  return (
    <pre css={{ margin: "1rem", whiteSpace: "pre-wrap" }}>❌ {error.message}</pre>
  );
}