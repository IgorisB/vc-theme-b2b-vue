import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./addOrUpdateCartShipment.graphql";
import type { InputShipmentType, Mutations, MutationsAddOrUpdateCartShipmentArgs } from "../../../types";

export default async function addOrUpdateCartShipment(shipment: InputShipmentType, cartId?: string): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<
    Required<Pick<Mutations, "addOrUpdateCartShipment">>,
    MutationsAddOrUpdateCartShipmentArgs
  >({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        cartId,
        shipment,
      },
    },
  });
}
