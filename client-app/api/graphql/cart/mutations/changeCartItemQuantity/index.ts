import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./changeCartItemQuantity.graphql";
import type { Mutations, MutationsChangeCartItemQuantityArgs } from "../../../types";

export default async function changeCartItemQuantity(lineItemId: string, quantity: number): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "changeCartItemQuantity">>, MutationsChangeCartItemQuantityArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        lineItemId,
        quantity,
      },
    },
  });
}
