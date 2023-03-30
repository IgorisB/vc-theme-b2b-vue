import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./addGiftItems.graphql";
import type { Mutations, MutationsAddGiftItemsArgs } from "../../../types";

export default async function addGiftItems(giftIds: string[]): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "addGiftItems">>, MutationsAddGiftItemsArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        ids: giftIds,
      },
    },
  });
}
