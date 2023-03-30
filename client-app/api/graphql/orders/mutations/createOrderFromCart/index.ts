import { graphqlClient } from "../../../client";
import mutationDocument from "./createOrderFromCart.graphql";
import type { CustomerOrderType, Mutations, MutationsCreateOrderFromCartArgs } from "../../../types";

export default async function createOrderFromCart(cartId?: string): Promise<CustomerOrderType> {
  const { data } = await graphqlClient.mutate<
    Required<Pick<Mutations, "createOrderFromCart">>,
    MutationsCreateOrderFromCartArgs
  >({
    mutation: mutationDocument,
    variables: {
      command: {
        cartId,
      },
    },
  });

  return data!.createOrderFromCart;
}
