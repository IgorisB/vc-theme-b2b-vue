import { graphqlClient } from "../../../client";
import mutationDocument from "./deleteMemberAddresses.graphql";
import type { InputMemberAddressType, Mutations, MutationsDeleteMemberAddressesArgs } from "../../../types";

export default async function deleteMemberAddresses(
  addresses: InputMemberAddressType[],
  memberId: string
): Promise<void> {
  await graphqlClient.mutate<Required<Pick<Mutations, "deleteMemberAddresses">>, MutationsDeleteMemberAddressesArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        memberId,
        addresses,
      },
    },
  });
}
