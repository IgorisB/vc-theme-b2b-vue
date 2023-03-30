import { graphqlClient } from "../../../client";
import queryDocument from "./getCountries.graphql";
import type { CountryType, Query } from "../../../types";

export default async function getCountries(): Promise<CountryType[]> {
  const { data } = await graphqlClient.query<Required<Pick<Query, "countries">>>({
    query: queryDocument,
  });

  return data.countries;
}
