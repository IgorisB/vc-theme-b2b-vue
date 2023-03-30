import { graphqlClient } from "../../../client";
import queryDocument from "./getMe.graphql";
import type { ContactTypeOrganizationsArgs, Query, UserType } from "../../../types";

export default async function getMe(): Promise<UserType> {
  const { data } = await graphqlClient.query<Required<Pick<Query, "me">>, ContactTypeOrganizationsArgs>({
    query: queryDocument,
  });

  return data.me;
}
