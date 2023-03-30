import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getOrder.graphql";
import type { CustomerOrderType, Query, QueryOrderArgs } from "../../../types";

export default async function getOrder(payload: QueryOrderArgs): Promise<CustomerOrderType> {
  const { cultureName } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "order">>, QueryOrderArgs>({
    query: queryDocument,
    variables: {
      cultureName,
      ...payload,
    },
  });

  return data.order;
}
