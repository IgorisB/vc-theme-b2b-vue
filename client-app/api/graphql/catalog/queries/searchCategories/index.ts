import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./searchCategories.graphql";
import type { CategoryConnection, Query, QueryCategoriesArgs } from "../../../types";

export default async function searchCategories(itemsPerPage: number, page: number): Promise<CategoryConnection> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "categories">>, QueryCategoriesArgs>({
    query: queryDocument,
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      first: itemsPerPage,
      after: String((page - 1) * itemsPerPage),
      filter: "status:visible",
      sort: "name:asc",
    },
  });

  return data.categories;
}
