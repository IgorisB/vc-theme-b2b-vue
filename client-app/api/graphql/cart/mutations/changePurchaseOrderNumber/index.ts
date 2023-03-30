import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./changePurchaseOrderNumber.graphql";
import type { Mutations, MutationsChangePurchaseOrderNumberArgs } from "../../../types";

export default async function changePurchaseOrderNumber(purchaseOrderNumber: string): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Pick<Mutations, "changePurchaseOrderNumber">, MutationsChangePurchaseOrderNumberArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        purchaseOrderNumber,
      },
    },
  });
}
