import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getQuote.graphql";
import type { Query, QueryQuoteArgs, QuoteType } from "../../../types";

export default async function getQuote(payload?: QueryQuoteArgs): Promise<QuoteType> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "quote">>, QueryQuoteArgs>({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      ...payload,
    },
  });

  return data.quote;
}
