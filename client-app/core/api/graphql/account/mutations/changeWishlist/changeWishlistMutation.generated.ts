import type * as Types from '../../../types/base.generated';

import type { WishlistLineItemFieldsFragment } from '../../../fragments/wishlistLineItemFields.generated';
import type { AvailabilityDataFragment } from '../../../catalog/fragments/availabilityData.generated';
import type { PropertyFragment } from '../../../catalog/fragments/property.generated';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ChangeWishlistMutationVariables = Types.Exact<{
  command: Types.InputChangeWishlistType;
}>;


export type ChangeWishlistMutation = { changeWishlist?: { id: string, name: string, description?: string, scope?: Types.WishlistScopeType, items?: Array<WishlistLineItemFieldsFragment> } };


export const ChangeWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeWishlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"command"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputChangeWishlistType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeWishlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"command"},"value":{"kind":"Variable","name":{"kind":"Name","value":"command"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"wishlistLineItemFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"availabilityData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AvailabilityData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"isBuyable"}},{"kind":"Field","name":{"kind":"Name","value":"isInStock"}},{"kind":"Field","name":{"kind":"Name","value":"availableQuantity"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"property"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Property"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"valueType"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"wishlistLineItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LineItemType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"listPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productType"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"outline"}},{"kind":"Field","name":{"kind":"Name","value":"minQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"maxQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"imgSrc"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"availabilityData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"availabilityData"}}]}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"property"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sale"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAmount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeWishlistMutation, ChangeWishlistMutationVariables>;