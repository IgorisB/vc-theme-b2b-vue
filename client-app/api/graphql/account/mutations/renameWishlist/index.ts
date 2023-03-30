import { graphqlClient } from "../../../client";
import mutationDocument from "./renameWishlist.graphql";
import type { InputRenameWishlistType, Mutations, MutationsRenameWishlistArgs, WishlistType } from "../../../types";

export default async function renameWishlist(payload: InputRenameWishlistType): Promise<WishlistType> {
  const { data } = await graphqlClient.mutate<Required<Pick<Mutations, "renameWishlist">>, MutationsRenameWishlistArgs>(
    {
      mutation: mutationDocument,
      variables: {
        command: payload,
      },
    }
  );

  return data!.renameWishlist;
}
