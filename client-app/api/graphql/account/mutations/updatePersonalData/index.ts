import { graphqlClient } from "../../../client";
import mutationDocument from "./updatePersonalData.graphql";
import type {
  InputPersonalDataType,
  IdentityResultType,
  Mutations,
  MutationsUpdatePersonalDataArgs,
} from "../../../types";

export default async function updatePersonalData(personalData: InputPersonalDataType): Promise<IdentityResultType> {
  const { data } = await graphqlClient.mutate<
    Required<Pick<Mutations, "updatePersonalData">>,
    MutationsUpdatePersonalDataArgs
  >({
    mutation: mutationDocument,
    variables: {
      command: {
        personalData,
      },
    },
  });

  return data!.updatePersonalData;
}
