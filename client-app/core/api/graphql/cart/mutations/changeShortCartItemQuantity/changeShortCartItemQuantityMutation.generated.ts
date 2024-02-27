import type * as Types from '../../../types/base.generated';

import type { ShortCartFragment } from '../../fragments/shortCart.generated';
import type { CartIdFragment } from '../../fragments/cartId.generated';
import type { ShortLineItemFragment } from '../../fragments/shortLineItem.generated';
import type { ValidationErrorFragment } from '../../fragments/validationError.generated';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ChangeShortCartItemQuantityMutationVariables = Types.Exact<{
  command: Types.InputChangeCartItemQuantityType;
  skipQuery: Types.Scalars['Boolean']['input'];
}>;


export type ChangeShortCartItemQuantityMutation = { changeCartItemQuantity?: ShortCartFragment };


export const ChangeShortCartItemQuantityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeShortCartItemQuantity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"command"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputChangeCartItemQuantityType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipQuery"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeCartItemQuantity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"command"},"value":{"kind":"Variable","name":{"kind":"Name","value":"command"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"shortCart"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipQuery"}}}]}]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"cartId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"shortLineItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LineItemType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"extendedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"validationError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationErrorType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"errorParameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectId"}},{"kind":"Field","name":{"kind":"Name","value":"objectType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"shortCart"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"cartId"}},{"kind":"Field","name":{"kind":"Name","value":"itemsQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"shortLineItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"validationErrors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ruleSet"},"value":{"kind":"StringValue","value":"*","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"validationError"}}]}}]}}]} as unknown as DocumentNode<ChangeShortCartItemQuantityMutation, ChangeShortCartItemQuantityMutationVariables>;