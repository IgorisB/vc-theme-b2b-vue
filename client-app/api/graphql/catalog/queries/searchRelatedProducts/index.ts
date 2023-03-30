import { DEFAULT_PAGE_SIZE } from "@/core/constants";
import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./searchRelatedProducts.graphql";
import type { ProductAssociation, ProductAssociationsArgs, Query, QueryProductArgs } from "../../../types";
import type { RelatedProductsSearchParams } from "../../types";

export default async function searchRelatedProducts({
  productId,
  group,
  query,
  page = 1,
  itemsPerPage = DEFAULT_PAGE_SIZE,
}: RelatedProductsSearchParams): Promise<ProductAssociation[]> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<
    Required<Pick<Query, "product">>,
    QueryProductArgs & ProductAssociationsArgs
  >({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      group,
      query,
      id: productId,
      first: itemsPerPage,
      after: String((page - 1) * itemsPerPage),
    },
  });

  return data.product?.associations?.items ?? [];
}
