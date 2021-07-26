import { FilterType } from "./filter-type.type";

export type FilterableAttribute = Omit<FilterType, "options">;
