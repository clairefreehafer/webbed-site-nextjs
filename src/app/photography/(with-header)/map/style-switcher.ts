import { IControl, Map } from "maplibre-gl";

type Style = {
  url: string;
  name: string;
};

// https://github.com/leoneljdias/maplibre-gl-style-flipper/blob/main/index.js
export class StyleSwitcher implements IControl {
  _map: Map | undefined;
  _container: HTMLDivElement | null = null;
  styles: Style[] = [];

  constructor(styles: Style[]) {
    this.styles = styles;
  }

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl style-switcher";

    const buttons: Record<string, HTMLButtonElement> = {};

    for (const style of this.styles) {
      const button = document.createElement("button");
      button.textContent = style.name;

      button.addEventListener("click", () => {
        this._map?.setStyle(style.url);
      });

      this._container.appendChild(button);
      buttons[style.name] = button;
    }

    return this._container;
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container);
    this._map = undefined;
  }
}
