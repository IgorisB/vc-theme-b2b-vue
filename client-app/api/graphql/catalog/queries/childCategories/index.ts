import { gql } from "graphql-tag";
import globals from "@/core/globals";
import { graphqlClient } from "../../../client";
import type { Category, Query, QueryChildCategoriesArgs } from "../../../types";
import type { DocumentNode } from "graphql";

function getQueryResponseTree(level: number): string {
  const newLevel = level - 1;

  if (newLevel >= 0) {
    return `
      childCategories {
        id
        name
        level
        slug
        parent {
          id
        }
        seoInfo {
          pageTitle
          metaKeywords
          metaDescription
        }
        breadcrumbs {
          title
          seoPath
        }
        ${getQueryResponseTree(newLevel)}
      }
    `;
  }

  return "";
}

function getChildCategoriesFragment(maxLevel: number): DocumentNode {
  const tree: string = getQueryResponseTree(maxLevel);

  return gql`
    fragment childCategoriesFields on ChildCategoriesQueryResponseType {
      ${tree}
    }
  `;
}

function getQueryDocument(maxLevel: number): DocumentNode {
  const childCategoriesFragment = getChildCategoriesFragment(maxLevel);

  return gql`
    ${childCategoriesFragment}
    query ChildCategories(
      $storeId: String
      $userId: String
      $cultureName: String
      $currencyCode: String
      $categoryId: String
      $maxLevel: Int
      $onlyActive: Boolean
    ) {
      childCategories(
        storeId: $storeId
        userId: $userId
        cultureName: $cultureName
        currencyCode: $currencyCode
        categoryId: $categoryId
        maxLevel: $maxLevel
        onlyActive: $onlyActive
      ) {
        ...childCategoriesFields
      }
    }
  `;
}

export default async function getChildCategories(payload: QueryChildCategoriesArgs): Promise<Category[]> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "childCategories">>, QueryChildCategoriesArgs>({
    query: getQueryDocument(payload.maxLevel!),
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      ...payload,
    },
  });

  return data.childCategories.childCategories ?? [];
}
