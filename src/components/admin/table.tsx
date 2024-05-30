import { ReactNode } from "react";

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
    item: Props<T>["data"][0],
  ) {
    if (typeof cellConfig === "function") {
      return cellConfig(item);
    }
    if (typeof cellConfig === "string") {
      return item[cellConfig];
    }
    return null;
  }

  return (
    <table className="mx-auto my-8 w-full border-collapse">
      <thead className="border-b-4 border-dotted border-b-white">
        <tr>
          {Object.keys(config).map((key) => (
            <th key={key} className="p-2">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b-1 border-dotted border-b-white">
            {Object.keys(config).map((key) => (
              <td key={key} className="p-2 text-center">
                {renderCell(config[key], item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
