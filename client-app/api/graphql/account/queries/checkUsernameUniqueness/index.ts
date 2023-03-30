import { graphqlClient } from "../../../client";
import queryDocument from "./checkUsernameUniqueness.graphql";
import type { Query, QueryCheckUsernameUniquenessArgs } from "../../../types";

export default async function checkUsernameUniqueness(payload: QueryCheckUsernameUniquenessArgs): Promise<boolean> {
  const { data } = await graphqlClient.query<
    Required<Pick<Query, "checkUsernameUniqueness">>,
    QueryCheckUsernameUniquenessArgs
  >({
    query: queryDocument,
    variables: {
      ...payload,
    },
  });

  return data.checkUsernameUniqueness;
}
