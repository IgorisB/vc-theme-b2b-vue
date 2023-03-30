import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./rejectGiftItems.graphql";
import type { Mutations, MutationsRejectGiftItemsArgs } from "../../../types";

export default async function rejectGiftItems(giftLineItemIds: string[]): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "rejectGiftItems">>, MutationsRejectGiftItemsArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        ids: giftLineItemIds,
      },
    },
  });
}
