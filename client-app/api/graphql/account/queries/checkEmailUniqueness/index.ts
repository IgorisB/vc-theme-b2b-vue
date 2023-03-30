import { graphqlClient } from "../../../client";
import queryDocument from "./checkEmailUniqueness.graphql";
import type { Query, QueryCheckEmailUniquenessArgs } from "../../../types";

export default async function checkEmailUniqueness(payload: QueryCheckEmailUniquenessArgs): Promise<boolean> {
  const { data } = await graphqlClient.query<
    Required<Pick<Query, "checkEmailUniqueness">>,
    QueryCheckEmailUniquenessArgs
  >({
    query: queryDocument,
    variables: {
      ...payload,
    },
  });

  return data.checkEmailUniqueness;
}
