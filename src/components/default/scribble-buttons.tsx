import ScribbleLink, { ScribbleLinkProps } from "./scribble-link";

type Button = ScribbleLinkProps & {
  emoji?: string;
};

export default function ScribbleButtons({ buttons }: { buttons: Button[] }) {
  const className = `links-${buttons.length}`;

  return (
    <div className="scribble-button-container">
      {buttons.map((button) => (
        <div key={button.href} className="scribble-button">
          {button.emoji && <span className="emoji">{button.emoji}</span>}
          <ScribbleLink {...button} className={className} key={button.href} />
        </div>
      ))}
    </div>
  );
}
