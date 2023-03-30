import { graphqlClient } from "../../../client";
import mutationDocument from "./removeQuoteItem.graphql";
import type { Mutations, MutationsRemoveQuoteItemArgs, QuoteType } from "../../../types";

export default async function removeQuoteItem(payload: MutationsRemoveQuoteItemArgs): Promise<QuoteType> {
  const { data } = await graphqlClient.mutate<
    Required<Pick<Mutations, "removeQuoteItem">>,
    MutationsRemoveQuoteItemArgs
  >({
    mutation: mutationDocument,
    variables: {
      ...payload,
    },
  });

  return data!.removeQuoteItem;
}
