import { graphqlClient } from "../../../client";
import queryDocument from "./requestPasswordReset.graphql";
import type { Query, QueryRequestPasswordResetArgs } from "../../../types";

export default async function requestPasswordReset(payload: QueryRequestPasswordResetArgs): Promise<boolean> {
  const { data } = await graphqlClient.query<
    Required<Pick<Query, "requestPasswordReset">>,
    QueryRequestPasswordResetArgs
  >({
    query: queryDocument,
    variables: {
      ...payload,
    },
  });

  return data.requestPasswordReset;
}
