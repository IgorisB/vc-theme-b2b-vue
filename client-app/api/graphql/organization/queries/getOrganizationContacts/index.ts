import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getOrganizationContacts.graphql";
import type { ContactConnection, OrganizationContactsArgs, Query, QueryOrganizationArgs } from "../../../types";

export default async function getOrganizationContacts(
  organizationId: string,
  payload: OrganizationContactsArgs
): Promise<ContactConnection> {
  const { userId } = globals;

  const { data } = await graphqlClient.query<
    Required<Pick<Query, "organization">>,
    QueryOrganizationArgs & OrganizationContactsArgs
  >({
    query: queryDocument,
    variables: {
      id: organizationId,
      userId,
      ...payload,
    },
  });

  return data.organization.contacts!;
}
