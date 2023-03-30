import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./addCoupon.graphql";
import type { Mutations, MutationsAddCouponArgs } from "../../../types";

export default async function addCoupon(couponCode: string): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "addCoupon">>, MutationsAddCouponArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        couponCode,
      },
    },
  });
}
