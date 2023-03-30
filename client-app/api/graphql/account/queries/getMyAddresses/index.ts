import { graphqlClient } from "../../../client";
import queryDocument from "./getMyAddresses.graphql";
import type { ContactTypeAddressesArgs, MemberAddressType, Query } from "../../../types";

export default async function getMyAddresses(payload?: ContactTypeAddressesArgs): Promise<MemberAddressType[]> {
  const { data } = await graphqlClient.query<Required<Pick<Query, "me">>, ContactTypeAddressesArgs>({
    query: queryDocument,
    variables: {
      ...payload,
    },
  });

  return data.me.contact?.addresses?.items ?? [];
}
