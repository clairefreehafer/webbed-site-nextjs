import "@/sass/default/scribble-button.scss";

import ScribbleLink, { ScribbleLinkProps } from "./scribble-link";

export default function ScribbleButtons({
  buttons,
}: {
  buttons: ScribbleLinkProps[];
}) {
  const className = `links-${buttons.length}`;

  return (
    <div className="scribble-button-container">
      {buttons.map((button) => (
        <ScribbleLink {...button} className={className} key={button.href} />
      ))}
    </div>
  );
}
