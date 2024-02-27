import type * as Types from '../../../types/base.generated';

import type { ShortCartFragment } from '../../fragments/shortCart.generated';
import type { CartIdFragment } from '../../fragments/cartId.generated';
import type { ShortLineItemFragment } from '../../fragments/shortLineItem.generated';
import type { ValidationErrorFragment } from '../../fragments/validationError.generated';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AddItemMutationVariables = Types.Exact<{
  command: Types.InputAddItemType;
}>;


export type AddItemMutation = { addItem?: ShortCartFragment };


export const AddItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"command"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputAddItemType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"command"},"value":{"kind":"Variable","name":{"kind":"Name","value":"command"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"shortCart"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"cartId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"shortLineItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LineItemType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"extendedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"validationError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationErrorType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"errorParameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectId"}},{"kind":"Field","name":{"kind":"Name","value":"objectType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"shortCart"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"cartId"}},{"kind":"Field","name":{"kind":"Name","value":"itemsQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"shortLineItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"validationErrors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ruleSet"},"value":{"kind":"StringValue","value":"*","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"validationError"}}]}}]}}]} as unknown as DocumentNode<AddItemMutation, AddItemMutationVariables>;