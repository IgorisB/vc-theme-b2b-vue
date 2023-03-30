import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getCart.graphql";
import type { CartType, Query, QueryCartArgs } from "../../../types";

export default async function getCart(): Promise<CartType> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "cart">>, QueryCartArgs>({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
    },
  });

  return data.cart;
}
