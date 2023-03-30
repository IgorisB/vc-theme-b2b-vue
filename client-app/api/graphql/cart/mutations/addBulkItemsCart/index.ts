import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./addBulkItemsCart.graphql";
import type { BulkCartType, InputNewBulkItemType, Mutations, MutationsAddBulkItemsCartArgs } from "../../../types";

export default async function addBulkItemsCart(items: InputNewBulkItemType[]): Promise<BulkCartType> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.mutate<
    Required<Pick<Mutations, "addBulkItemsCart">>,
    MutationsAddBulkItemsCartArgs
  >({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        cartItems: items,
      },
    },
  });

  return data!.addBulkItemsCart;
}
