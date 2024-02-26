import type { ICurrency } from "./currency";
import type { ILanguage } from "./language";
import type { IThemeConfigPreset } from "./theme-config";
import type { GetStoreQuery } from "@/core/api/graphql/types";

export interface IThemeContext {
  storeId: string;
  storeName: string;
  catalogId: string;
  defaultLanguage: ILanguage;
  defaultCurrency: ICurrency;
  availableLanguages: ILanguage[];
  availableCurrencies: ICurrency[];
  settings: IThemeConfigPreset;
  storeSettings: Exclude<GetStoreQuery["store"], undefined>["settings"];
}
