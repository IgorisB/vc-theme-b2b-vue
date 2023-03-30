import type { CartAddressType, MemberAddressType, OrderAddressType, QuoteAddressType } from "@/api/graphql/types";

export type AnyAddressType = MemberAddressType | OrderAddressType | CartAddressType | QuoteAddressType;
