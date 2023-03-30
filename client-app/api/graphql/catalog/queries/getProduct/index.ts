import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getProduct.graphql";
import type { Product, Query, QueryProductArgs } from "../../../types";

export default async function getProduct(id: string): Promise<Product | null> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "product">>, QueryProductArgs>({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      id,
    },
  });

  return data.product;
}
