import { RecipeVariantRecord, SystemStyleObject } from "@panda/types";

export type VariantTyping<T extends string | number | symbol> = {
  [K in keyof T]: Record<K, Record<any, SystemStyleObject>>;
};
