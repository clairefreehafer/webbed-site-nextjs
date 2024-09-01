/** ListItem for any miscellanious types that only need one piece of text. */
export default function OtherListItem({ text }: { text: string }) {
  return <li key={text}>{text}</li>;
}
