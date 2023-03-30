import { graphqlClient } from "../../../client";
import mutationDocument from "./addOrUpdateOrderPayment.graphql";
import type { InputAddOrUpdateOrderPaymentType, Mutations, MutationsAddOrUpdateOrderPaymentArgs } from "../../../types";

export default async function addOrUpdateOrderPayment(payload: InputAddOrUpdateOrderPaymentType): Promise<void> {
  await graphqlClient.mutate<
    Required<Pick<Mutations, "addOrUpdateOrderPayment">>,
    MutationsAddOrUpdateOrderPaymentArgs
  >({
    mutation: mutationDocument,
    variables: {
      command: payload,
    },
  });
}
