import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getQuotes.graphql";
import type { Query, QueryQuotesArgs, QuoteConnection } from "../../../types";

export default async function getQuotes(payload?: QueryQuotesArgs): Promise<QuoteConnection> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "quotes">>, QueryQuotesArgs>({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      ...payload,
    },
  });

  return data.quotes;
}
