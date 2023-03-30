import { graphqlClient } from "../../../client";
import mutationDocument from "./submitQuoteRequest.graphql";
import type { Mutations, MutationsSubmitQuoteRequestArgs, QuoteType } from "../../../types";

export default async function submitQuoteRequest(payload: MutationsSubmitQuoteRequestArgs): Promise<QuoteType> {
  const { data } = await graphqlClient.mutate<
    Required<Pick<Mutations, "submitQuoteRequest">>,
    MutationsSubmitQuoteRequestArgs
  >({
    mutation: mutationDocument,
    variables: {
      ...payload,
    },
  });

  return data!.submitQuoteRequest;
}
