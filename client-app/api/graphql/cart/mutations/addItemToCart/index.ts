import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./addItemToCart.graphql";
import type { Mutations, MutationsAddItemArgs } from "../../../types";

export default async function addItemToCart(productId: string, quantity: number): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "addItem">>, MutationsAddItemArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        productId,
        quantity,
      },
    },
  });
}
