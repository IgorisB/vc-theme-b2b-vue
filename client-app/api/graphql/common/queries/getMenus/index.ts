import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import queryDocument from "./getMenus.graphql";
import type { MenuLinkListType, Query, QueryMenusArgs } from "../../../types";

export default async function getMenus(payload?: Partial<QueryMenusArgs>): Promise<MenuLinkListType[]> {
  const { storeId } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "menus">>, QueryMenusArgs>({
    query: queryDocument,
    variables: {
      storeId,
      ...payload,
    },
  });

  return data.menus;
}
