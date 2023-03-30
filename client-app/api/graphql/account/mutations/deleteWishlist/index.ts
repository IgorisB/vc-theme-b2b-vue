import { graphqlClient } from "../../../client";
import mutationDocument from "./deleteWishlist.graphql";
import type { Mutations, MutationsRemoveWishlistArgs } from "../../../types";

export default async function deleteWishlist(listId: string): Promise<boolean> {
  const { data } = await graphqlClient.mutate<Required<Pick<Mutations, "removeWishlist">>, MutationsRemoveWishlistArgs>(
    {
      mutation: mutationDocument,
      variables: {
        command: {
          listId,
        },
      },
    }
  );

  return data!.removeWishlist;
}
