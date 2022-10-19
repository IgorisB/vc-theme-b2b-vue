import { Query, QueryTasksArgs, WorkTaskConnection } from "@/xapi/types";
import getTasksDocument from "./getTasks.graphql";
import globals from "@/core/globals";

export default async function getTasks(payload?: QueryTasksArgs): Promise<WorkTaskConnection> {
  const { userId, storeId } = globals;
  const { $graphqlClient } = useNuxtApp();

  const { data } = await $graphqlClient.query<Required<Pick<Query, "tasks">>, QueryTasksArgs>({
    query: getTasksDocument,
    variables: {
      responsibleName: userId,
      storeId,
      ...payload,
    },
  });

  return data.tasks;
}
