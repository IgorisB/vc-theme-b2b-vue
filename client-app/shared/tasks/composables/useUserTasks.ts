import { computed, readonly, ref, Ref, shallowRef } from "vue";
import { WorkTaskType } from "@/xapi/types";
import { getSortingExpression, Logger } from "@/core/utilities";
import { ISortInfo } from "@/core/types";
import { SORT_DESCENDING } from "@/core/constants";
import getTasks from "@/xapi/graphql/tasks/queries";
import confirmTask from "@/xapi/graphql/tasks/mutations/confirmTask";
import rejectTask from "@/xapi/graphql/tasks/mutations/rejectTask";

const DEFAULT_ITEMS_PER_PAGE = 10;

export default () => {
  const tasks: Ref<WorkTaskType[]> = shallowRef<WorkTaskType[]>([]);
  const loading: Ref<boolean> = ref(false);
  const itemsPerPage: Ref<number> = ref(DEFAULT_ITEMS_PER_PAGE);
  const pages: Ref<number> = ref(0);
  const page: Ref<number> = ref(1);

  // TODO: refine the sorting logic
  const sort: Ref<ISortInfo> = ref({
    column: "createdDate",
    direction: SORT_DESCENDING,
  });

  async function loadTasks() {
    loading.value = true;

    const sortingExpression = getSortingExpression(sort.value);

    try {
      const response = await getTasks({
        sort: sortingExpression,
        first: itemsPerPage.value,
        after: String((page.value - 1) * itemsPerPage.value),
      });
      tasks.value = response.items ?? [];
      pages.value = Math.ceil((response.totalCount ?? 0) / itemsPerPage.value);
    } catch (e) {
      Logger.error("useUserOrders.loadOrders", e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function confirmUserTask(id: string) {
    loading.value = true;

    try {
      await confirmTask(id);
    } catch (e) {
      Logger.error("useUserTask.confirmUserTask", e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function rejectUserTask(id: string) {
    loading.value = true;

    try {
      await rejectTask(id);
    } catch (e) {
      Logger.error("useUserTask.rejectUserTask", e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    sort,
    loadTasks,
    confirmUserTask,
    rejectUserTask,
    loading: readonly(loading),
    tasks: computed(() => tasks.value),
    itemsPerPage,
    pages,
    page,
  };
};
