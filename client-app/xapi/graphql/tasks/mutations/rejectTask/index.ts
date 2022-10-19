import mutationDocument from "./rejectTaskMutation.graphql";
import { Mutations, MutationsRejectTaskArgs, WorkTaskType } from "@/xapi/types";

export default async function rejectTask(id: string): Promise<WorkTaskType> {
  const { $graphqlClient } = useNuxtApp();

  const { data } = await $graphqlClient.mutate<Required<Pick<Mutations, "rejectTask">>, MutationsRejectTaskArgs>({
    mutation: mutationDocument,
    variables: {
      command: {
        id,
      },
    },
  });

  return data!.rejectTask;
}
