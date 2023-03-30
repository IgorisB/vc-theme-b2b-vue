import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getOrders.graphql";
import type { CustomerOrderConnection, Query, QueryOrdersArgs } from "../../../types";

export default async function getOrders(payload?: QueryOrdersArgs): Promise<CustomerOrderConnection> {
  const { userId, cultureName } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "orders">>, QueryOrdersArgs>({
    query: queryDocument,
    variables: {
      userId,
      cultureName,
      ...payload,
    },
  });

  return data.orders;
}
