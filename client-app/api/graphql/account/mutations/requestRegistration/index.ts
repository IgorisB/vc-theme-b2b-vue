import { graphqlClient } from "../../../client";
import mutationDocument from "./requestRegistration.graphql";
import type {
  InputRequestRegistrationType,
  Mutations,
  MutationsRequestRegistrationArgs,
  RequestRegistrationType,
} from "../../../types";

export default async function requestRegistration(
  registrationData: InputRequestRegistrationType
): Promise<RequestRegistrationType> {
  const { data } = await graphqlClient.mutate<
    Required<Pick<Mutations, "requestRegistration">>,
    MutationsRequestRegistrationArgs
  >({
    mutation: mutationDocument,
    variables: {
      command: registrationData,
    },
  });

  return data!.requestRegistration;
}
