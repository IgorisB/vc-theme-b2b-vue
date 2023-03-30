import { DEFAULT_PAGE_SIZE } from "@/core/constants";
import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./searchProducts.graphql";
import type { ProductConnection, Query, QueryProductsArgs } from "../../../types";
import type { ProductsSearchParams } from "@/shared/catalog";

export default async function searchProducts(
  {
    itemsPerPage = DEFAULT_PAGE_SIZE,
    page = 1,
    categoryId,
    filter,
    sort,
    keyword,
    fuzzy,
    fuzzyLevel,
    productIds,
  }: Partial<ProductsSearchParams>,
  options: {
    /** @default false */
    withFacets?: boolean;
    /** @default true */
    withImages?: boolean;
    /** @default false */
    withZeroPrice?: boolean;
  } = {}
): Promise<ProductConnection> {
  const { storeId, catalogId, userId, cultureName, currencyCode } = globals;
  const { withFacets = false, withImages = true, withZeroPrice = false } = options;

  const filterString = [
    `category.subtree:${catalogId}${categoryId ? "/" + categoryId : ""}`,
    withZeroPrice ? "" : "price:(0 TO)",
    filter,
  ]
    .filter(Boolean)
    .join(" ");

  const { data } = await graphqlClient.query<
    Required<Pick<Query, "products">>,
    QueryProductsArgs & { withFacets: boolean; withImages: boolean }
  >({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      sort,
      fuzzy,
      fuzzyLevel,
      withFacets,
      withImages,
      query: keyword,
      filter: filterString,
      first: itemsPerPage,
      after: String((page - 1) * itemsPerPage),
      productIds,
    },
  });

  return data.products;
}
