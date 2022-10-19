import mutationDocument from "./confirmTaskMutation.graphql";
import { Mutations, MutationsConfirmTaskArgs, WorkTaskType } from "@/xapi/types";

export default async function confirmTask(id: string): Promise<WorkTaskType> {
  const { $graphqlClient } = useNuxtApp();

  const { data } = await $graphqlClient.mutate<Required<Pick<Mutations, "confirmTask">>, MutationsConfirmTaskArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        id,
      },
    },
  });

  return data!.confirmTask;
}
