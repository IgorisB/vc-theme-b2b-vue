import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./removeCoupon.graphql";
import type { Mutations, MutationsRemoveCouponArgs } from "../../../types";

export default async function removeCoupon(couponCode: string): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "removeCoupon">>, MutationsRemoveCouponArgs>({
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
