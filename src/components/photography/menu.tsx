export default function Menu({ menuOpen }: { menuOpen: boolean }) {
  return (
    <nav
      style={{
        display: menuOpen ? "flex" : "none",
      }}
    >
      <ul>
        <li>
          <s>today</s>
        </li>
        <li>recently added</li>
        <li>
          <a href="/photography/albums">albums</a>
        </li>
        <li>
          <s>chronological</s>
        </li>
        <li>collections</li>
        <li>
          <s>curated</s>
        </li>
        <li>technical</li>
        <li>
          <s>map</s>
        </li>
        <li>
          <s>random</s>
        </li>
      </ul>
    </nav>
  );
}
