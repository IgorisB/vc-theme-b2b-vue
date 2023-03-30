import { DEFAULT_PAGE_SIZE } from "@/core/constants";
import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getSearchResults.graphql";
import type { GetSearchResultsQueryVariables, Query } from "../../../types";
import type { SearchResultsParams } from "../../types";

type SearchResultsType = Required<Pick<Query, "categories" | "products">>;

export default async function getSearchResults({
  keyword,

  products: {
    itemsPerPage: productsItemsPerPage = DEFAULT_PAGE_SIZE,
    page: productsPage = 1,
    sort: productsSort,
    fuzzy: productsFuzzy,
    fuzzyLevel: productsFuzzyLevel,
  } = {},

  categories: {
    itemsPerPage: categoriesItemsPerPage = DEFAULT_PAGE_SIZE,
    page: categoriesPage = 1,
    sort: categoriesSort,
    fuzzy: categoriesFuzzy,
    fuzzyLevel: categoriesFuzzyLevel,
  } = {},
}: SearchResultsParams): Promise<SearchResultsType> {
  const { storeId, catalogId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<SearchResultsType, GetSearchResultsQueryVariables>({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      productsSort,
      productsFuzzy,
      productsFuzzyLevel,
      categoriesSort,
      categoriesFuzzy,
      categoriesFuzzyLevel,
      query: keyword,
      filter: `category.subtree:${catalogId}`,
      productsFirst: productsItemsPerPage,
      productsAfter: String((productsPage - 1) * productsItemsPerPage),
      categoriesFirst: categoriesItemsPerPage,
      categoriesAfter: String((categoriesPage - 1) * categoriesItemsPerPage),
    },
  });

  return data;
}
