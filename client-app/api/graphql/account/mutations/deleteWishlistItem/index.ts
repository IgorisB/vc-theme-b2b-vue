import { graphqlClient } from "../../../client";
import mutationDocument from "./deleteWishlistItem.graphql";
import type {
  InputRemoveWishlistItemType,
  Mutations,
  MutationsRemoveWishlistItemArgs,
  WishlistType,
} from "../../../types";

export default async function deleteWishlistItem(payload: InputRemoveWishlistItemType): Promise<WishlistType> {
  const { data } = await graphqlClient.mutate<
    Required<Pick<Mutations, "removeWishlistItem">>,
    MutationsRemoveWishlistItemArgs
  >({
    mutation: mutationDocument,
    variables: {
      command: payload,
    },
  });

  return data!.removeWishlistItem;
}
