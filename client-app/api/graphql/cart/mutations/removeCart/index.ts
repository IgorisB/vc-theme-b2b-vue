import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./removeCartMutation.graphql";
import type { Mutations, MutationsRemoveCartArgs } from "../../../types";

export default async function removeCart(cartId: string): Promise<void> {
  const { userId } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "removeCart">>, MutationsRemoveCartArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        cartId,
        userId,
      },
    },
  });
}
