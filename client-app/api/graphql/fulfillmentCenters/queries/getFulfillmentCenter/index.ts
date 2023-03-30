import { graphqlClient } from "../../../client";
import queryDocument from "./getFulfillmentCenter.graphql";
import type { FulfillmentCenterType, Query, QueryFulfillmentCenterArgs } from "../../../types";

export default async function getProduct(id: string): Promise<FulfillmentCenterType | null> {
  const { data } = await graphqlClient.query<Required<Pick<Query, "fulfillmentCenter">>, QueryFulfillmentCenterArgs>({
    query: queryDocument,
    variables: {
      id,
    },
  });

  return data.fulfillmentCenter;
}
