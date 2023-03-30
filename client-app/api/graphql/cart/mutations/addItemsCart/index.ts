import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./addItemsCart.graphql";
import type { InputNewCartItemType, Mutations, MutationsAddItemsCartArgs } from "../../../types";

export default async function addItemsCart(items: InputNewCartItemType[]): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "addItemsCart">>, MutationsAddItemsCartArgs>({
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
}
