import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getFulfillmentCenters.graphql";
import type { FulfillmentCenterConnection, Query, QueryFulfillmentCentersArgs } from "../../../types";

export default async function getFulfillmentCenters(sort = "name"): Promise<FulfillmentCenterConnection> {
  const { storeId } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "fulfillmentCenters">>, QueryFulfillmentCentersArgs>({
    query: queryDocument,
    variables: {
      storeId,
      sort,
    },
  });

  return data.fulfillmentCenters;
}
