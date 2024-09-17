import { css } from "@panda/css";
import { ReactNode } from "react";

const table = css({
  borderCollapse: "collapse",
  width: "100%",
});

const thead = css({
  borderBottom: "4px dotted white",
});

const th = css({
  p: "0.5rem",
});

const tr = css({
  borderBottom: "1px dotted white",
});

const td = css({
  p: "0.5rem",
  textAlign: "center",
});

export type AdminTableConfig<T> = Record<
  string,
  string | ((item: T) => ReactNode)
>;

interface Data {
  id: number;
  [key: string]: any;
}

type Props<T> = {
  data: T[];
  config: AdminTableConfig<T>;
};

export default function AdminTable<T extends Data>({ data, config }: Props<T>) {
  function renderCell(
    cellConfig: Props<T>["config"][0],
    item: Props<T>["data"][0]
  ) {
    if (typeof cellConfig === "function") {
      return cellConfig(item);
    }
    if (typeof cellConfig === "string") {
      return item[cellConfig];
    }
    return null;
  }

  if (!data || data.length === 0) {
    return <>❌ no data to display.</>;
  }

  return (
    <table className={table}>
      <thead className={thead}>
        <tr>
          {Object.keys(config).map((key) => (
            <th key={key} className={th}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className={tr}>
            {Object.keys(config).map((key) => (
              <td key={key} className={td}>
                {renderCell(config[key], item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
