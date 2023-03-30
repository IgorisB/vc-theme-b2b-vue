import { graphqlClient } from "../../../client";
import queryDocument from "./getWishlist.graphql";
import type { Query, QueryWishlistArgs, WishlistType } from "../../../types";

export default async function getWishlist(listId: string): Promise<WishlistType> {
  const { data } = await graphqlClient.query<Required<Pick<Query, "wishlist">>, QueryWishlistArgs>({
    query: queryDocument,
    variables: {
      listId,
    },
  });

  return data.wishlist;
}
