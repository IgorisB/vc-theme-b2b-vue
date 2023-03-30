import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import mutationDocument from "./changeCartComment.graphql";
import type { Mutations, MutationsChangeCommentArgs } from "../../../types";

export default async function changeCartComment(comment: string): Promise<void> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  await graphqlClient.mutate<Required<Pick<Mutations, "changeComment">>, MutationsChangeCommentArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId,
        userId,
        cultureName,
        currencyCode,
        comment,
      },
    },
  });
}
