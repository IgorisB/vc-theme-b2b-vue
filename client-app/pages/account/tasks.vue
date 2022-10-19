<template>
  <div>
    <!-- Title block -->
    <div class="flex justify-between items-center mx-5 md:mx-0">
      <h2 class="text-gray-800 text-3xl font-bold uppercase" v-t="'pages.account.tasks.title'" />
    </div>

    <div class="-mt-5" ref="stickyMobileHeaderAnchor"></div>

    <!-- Empty view -->
    <VcEmptyView v-if="!tasks.length && !tasksLoading" :text="$t('pages.account.orders.no_orders_message')">
      <template #icon>
        <VcImage src="/static/images/common/order.svg" :alt="$t('pages.account.orders.no_orders_img_alt')" />
      </template>

      <template #button>
        <VcButton :to="{ name: 'Catalog' }" class="px-6 uppercase" size="lg">
          {{ $t("pages.account.orders.buttons.no_orders") }}
        </VcButton>
      </template>
    </VcEmptyView>

    <!-- Content block -->
    <div v-else class="flex flex-col bg-white shadow-sm md:rounded md:border">
      <VcTable
        :loading="tasksLoading"
        :columns="columns"
        :items="tasks"
        :sort="sort"
        :pages="pages"
        :page="page"
        @headerClick="applySorting"
        @pageChanged="changePage"
      >
        <template #mobile-item="itemData">
          <div class="grid grid-cols-2 p-6 gap-y-4 border-b border-gray-200 cursor-pointer">
            <div class="flex flex-col">
              <span class="text-sm text-gray-400" v-t="'pages.account.orders.order_number_label'" />

              <span class="pr-4 font-extrabold overflow-hidden overflow-ellipsis">
                {{ itemData.id }}
              </span>
            </div>

            <div class="flex flex-col justify-center items-end">
              {{ itemData.id }}
            </div>

            <div class="flex flex-col">
              <span class="text-sm text-gray-400" v-t="'pages.account.orders.date_label'" />

              <span class="overflow-hidden overflow-ellipsis">
                {{ $d(itemData.item?.createdDate) }}
              </span>
            </div>

            <div class="flex flex-col">
              <span class="text-sm text-gray-400" v-t="'pages.account.orders.total_label'" />

              <span class="overflow-hidden overflow-ellipsis font-extrabold">
                {{ itemData.id }}
              </span>
            </div>
          </div>
        </template>

        <template #mobile-skeleton>
          <div v-for="i in itemsPerPage" :key="i" class="grid grid-cols-2 p-6 gap-y-4 border-b border-gray-200">
            <div class="flex flex-col">
              <span class="text-sm text-gray-400" v-t="'pages.account.orders.order_number_label'"></span>
              <div class="h-6 mr-4 bg-gray-200 animate-pulse"></div>
            </div>

            <div class="flex flex-col">
              <span class="text-sm text-gray-400" v-t="'pages.account.orders.date_label'"></span>
              <div class="h-6 bg-gray-200 animate-pulse"></div>
            </div>

            <div class="flex flex-col">
              <span class="text-sm text-gray-400" v-t="'pages.account.orders.total_label'"></span>
              <div class="h-6 mr-4 bg-gray-200 animate-pulse"></div>
            </div>

            <div class="flex flex-col">
              <span class="text-sm text-gray-400" v-t="'pages.account.orders.status_label'"></span>
              <div class="h-6 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </template>

        <template #desktop-body>
          <tr v-for="task in tasks" :key="task.id" class="even:bg-gray-50 hover:bg-gray-200 cursor-pointer">
            <td class="p-5 overflow-hidden overflow-ellipsis">
              {{ task.description }}
            </td>

            <td class="p-5 overflow-hidden overflow-ellipsis">
              {{ $d(task.createdDate, "long") }}
            </td>

            <td class="p-5 overflow-hidden overflow-ellipsis">
              {{ $d(task.dueDate, "long") }}
            </td>

            <td class="p-5 overflow-hidden overflow-ellipsis">
              <TableStatusBadge :status="calculateTaskStatus(task)" class="mx-auto" />
            </td>

            <td class="p-5 overflow-hidden overflow-ellipsis text-right">
              <div class="inline-block space-x-2" v-if="task.isActive === true">
                <!-- todo: use VcButton -->
                <button
                  type="button"
                  class="h-7 w-7 shadow rounded text-[color:var(--color-success)] hover:bg-gray-100"
                  @click="approveTask(task.id)"
                  :title="$t('pages.account.addresses.edit_label')"
                >
                  <i class="fas fa-check" />
                </button>

                <button
                  type="button"
                  class="h-7 w-7 shadow rounded text-[color:var(--color-danger)] hover:bg-gray-100"
                  @click="rejectTask(task.id)"
                  :title="$t('pages.account.addresses.delete_label')"
                >
                  <i class="fas fa-times" />
                </button>
              </div>
            </td>
          </tr>
        </template>

        <template #desktop-skeleton>
          <tr v-for="i in itemsPerPage" :key="i" class="even:bg-gray-50">
            <td class="p-5">
              <div class="h-6 bg-gray-200 animate-pulse"></div>
            </td>

            <td class="w-4/12 p-5">
              <div class="h-6 bg-gray-200 animate-pulse"></div>
            </td>

            <td class="p-5">
              <div class="h-6 bg-gray-200 animate-pulse"></div>
            </td>

            <td class="p-5">
              <div class="h-6 bg-gray-200 animate-pulse"></div>
            </td>

            <td class="p-5">
              <div class="h-6 bg-gray-200 animate-pulse"></div>
            </td>
          </tr>
        </template>
      </VcTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import { getNewSorting } from "@/core/utilities";
import { WorkTaskType } from "@/xapi/types";
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import useUserTasks from "@/shared/tasks/composables/useUserTasks";

const { t } = useI18n();
const {
  loadTasks,
  rejectUserTask,
  confirmUserTask,
  loading: tasksLoading,
  tasks,
  sort,
  pages,
  itemsPerPage,
  page,
} = useUserTasks();

usePageHead({
  title: t("pages.account.orders.meta.title"),
});

const stickyMobileHeaderAnchor = shallowRef<HTMLElement | null>(null);

const columns = ref<ITableColumn[]>([
  {
    id: "description",
    title: t("pages.account.tasks.description_label"),
  },
  {
    id: "createdDate",
    title: t("pages.account.tasks.created_date_label"),
    sortable: true,
  },
  {
    id: "dueDate",
    title: t("pages.account.tasks.due_date_label"),
    sortable: true,
  },
  {
    id: "status",
    title: t("pages.account.tasks.status_label"),
    align: "center",
  },
  {
    id: "actions",
    title: t("pages.account.tasks.actions_label"),
    align: "right",
  },
]);

async function changePage(newPage: number) {
  page.value = newPage;
  window.scroll({ top: 0, behavior: "smooth" });
  await loadTasks();
}

async function applySorting(column: string) {
  sort.value = getNewSorting(sort.value, column);
  page.value = 1;
  await loadTasks();
}

function calculateTaskStatus(task: WorkTaskType) {
  return task.isActive === true ? "Processing" : task.completed === true ? "Done" : "Rejected";
}

async function approveTask(id: string) {
  await confirmUserTask(id);
  loadTasks();
}

async function rejectTask(id: string) {
  await rejectUserTask(id);
  loadTasks();
}

onMounted(async () => {
  await loadTasks();
});
</script>
