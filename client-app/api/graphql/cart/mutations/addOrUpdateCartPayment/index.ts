import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./addOrUpdateCartPayment.graphql";
import type { InputPaymentType, Mutations, MutationsAddOrUpdateCartPaymentArgs } from "../../../types";

export default async function addOrUpdateCartPayment(payment: InputPaymentType, cartId?: string): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "addOrUpdateCartPayment">>, MutationsAddOrUpdateCartPaymentArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        cartId,
        payment,
      },
    },
  });
}
