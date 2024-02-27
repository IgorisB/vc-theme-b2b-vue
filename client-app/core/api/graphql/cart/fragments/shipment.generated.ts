import type * as Types from '../../types/base.generated';

import type { CartAddressFragment } from './cartAddress.generated';
import type { MoneyFragment } from '../../common/fragments/money.generated';
import type { CurrencyFragment } from '../../common/fragments/currency.generated';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ShipmentFragment = { id: string, shipmentMethodCode?: string, shipmentMethodOption?: string, deliveryAddress?: CartAddressFragment, price: MoneyFragment, discountAmount: MoneyFragment };

export const ShipmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"shipment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShipmentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shipmentMethodCode"}},{"kind":"Field","name":{"kind":"Name","value":"shipmentMethodOption"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"cartAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"money"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"money"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"currency"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CurrencyType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"cartAddress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartAddressType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"countryName"}},{"kind":"Field","name":{"kind":"Name","value":"regionId"}},{"kind":"Field","name":{"kind":"Name","value":"regionName"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"addressType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"money"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MoneyType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"formattedAmountWithoutCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"currency"}}]}}]}}]} as unknown as DocumentNode<ShipmentFragment, unknown>;