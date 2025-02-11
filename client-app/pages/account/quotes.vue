<template>
  <div>
    <!-- Title block -->
    <div class="flex items-center justify-between gap-2">
      <VcTypography tag="h1">
        {{ $t("pages.account.quotes.title") }}
      </VcTypography>

      <VcButton size="sm" variant="outline" prepend-icon="plus" @click="requestQuote">
        <span class="hidden sm:inline">{{ $t("pages.account.quotes.request_quote_button") }}</span>
        <span class="sm:hidden">{{ $t("pages.account.quotes.request_quote_button") }}</span>
      </VcButton>
    </div>

    <div ref="stickyMobileHeaderAnchor" class="-mt-5" />

    <!-- Page toolbar -->
    <PageToolbarBlock
      :stick="stickyMobileHeaderIsVisible"
      class="flex flex-row items-center gap-x-2 lg:flex-row-reverse lg:gap-x-5"
      shadow
    >
      <div class="flex grow">
        <VcInput
          v-model="keyword"
          :disabled="fetching"
          :placeholder="$t('pages.account.quotes.search_placeholder')"
          maxlength="64"
          class="w-full"
          @keypress.enter="applyKeyword"
        >
          <template #append>
            <button v-if="keyword" type="button" class="flex h-full items-center px-4" @click="resetKeyword">
              <VcIcon class="text-[--color-primary-500]" name="delete-2" size="xs" />
            </button>

            <VcButton :disabled="fetching" icon="search" @click="applyKeyword" />
          </template>
        </VcInput>
      </div>
    </PageToolbarBlock>

    <!-- Empty view -->
    <VcEmptyView
      v-if="!fetching && !quotes.length"
      :text="$t(!!keyword ? 'pages.account.quotes.no_results_message' : 'pages.account.quotes.no_quotes_message')"
    >
      <template #icon>
        <VcImage src="/static/images/common/order.svg" :alt="$t('pages.account.orders.no_orders_img_alt')" />
      </template>
    </VcEmptyView>

    <!-- Content block -->
    <VcWidget v-else size="lg">
      <template #default-container>
        <VcTable
          :loading="fetching"
          :columns="columns"
          :sort="sort"
          :items="quotes"
          :pages="pages"
          :page="page"
          :description="$t('pages.account.quotes.meta.table_description')"
          @item-click="goToQuoteDetails"
          @header-click="applySorting"
          @page-changed="changePage"
        >
          <template #mobile-item="itemData">
            <div
              class="grid cursor-pointer grid-cols-2 gap-y-4 border-b border-gray-200 p-6"
              role="button"
              tabindex="0"
              @click="goToQuoteDetails(itemData.item)"
              @keyup.enter="goToQuoteDetails(itemData.item)"
            >
              <div class="flex flex-col">
                <span v-t="'pages.account.quotes.quote_number_label'" class="text-sm text-gray-400" />

                <span class="overflow-hidden text-ellipsis pr-4 font-extrabold">
                  {{ itemData.item.number }}
                </span>
              </div>

              <div class="flex flex-col items-end justify-center">
                <QuoteStatus class="w-full !max-w-[9rem]" :status="itemData.item.status" />
              </div>

              <div class="flex flex-col">
                <span v-t="'pages.account.quotes.date_label'" class="text-sm text-gray-400" />

                <span class="overflow-hidden text-ellipsis">
                  {{ $d(itemData.item?.createdDate) }}
                </span>
              </div>

              <div class="flex flex-col">
                <span v-t="'pages.account.quotes.total_label'" class="text-sm text-gray-400" />

                <span class="overflow-hidden text-ellipsis font-extrabold">
                  {{ itemData.item.totals?.grandTotalInclTax?.formattedAmount }}
                </span>
              </div>
            </div>
          </template>

          <template #mobile-skeleton>
            <div v-for="i in itemsPerPage" :key="i" class="grid grid-cols-2 gap-y-4 border-b border-gray-200 p-6">
              <div class="flex flex-col">
                <span v-t="'pages.account.quotes.quote_number_label'" class="text-sm text-gray-400"></span>
                <div class="mr-4 h-6 animate-pulse bg-gray-200"></div>
              </div>

              <div class="flex flex-col">
                <span v-t="'pages.account.quotes.date_label'" class="text-sm text-gray-400"></span>
                <div class="h-6 animate-pulse bg-gray-200"></div>
              </div>

              <div class="flex flex-col">
                <span v-t="'pages.account.quotes.total_label'" class="text-sm text-gray-400"></span>
                <div class="mr-4 h-6 animate-pulse bg-gray-200"></div>
              </div>

              <div class="flex flex-col">
                <span v-t="'pages.account.quotes.status_label'" class="text-sm text-gray-400"></span>
                <div class="h-6 animate-pulse bg-gray-200"></div>
              </div>
            </div>
          </template>

          <template #desktop-body>
            <tr
              v-for="quote in quotes"
              :key="quote.id"
              class="cursor-pointer even:bg-gray-50 hover:bg-gray-200"
              @click="goToQuoteDetails(quote)"
            >
              <td class="overflow-hidden text-ellipsis p-5">
                {{ quote.number }}
              </td>

              <td class="overflow-hidden text-ellipsis p-5">
                {{ $d(quote.createdDate) }}
              </td>

              <td class="overflow-hidden text-ellipsis p-5 text-center">
                <QuoteStatus class="w-full !max-w-[9rem]" :status="quote.status" />
              </td>

              <td class="overflow-hidden text-ellipsis p-5 text-right">
                {{ quote.totals?.grandTotalInclTax?.formattedAmount }}
              </td>
            </tr>
          </template>

          <template #desktop-skeleton>
            <tr v-for="i in itemsPerPage" :key="i" class="even:bg-gray-50">
              <td v-for="column in columns" :key="column.id" class="p-5">
                <div class="h-6 animate-pulse bg-gray-200"></div>
              </td>
            </tr>
          </template>
        </VcTable>
      </template>
    </VcWidget>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind, useElementVisibility } from "@vueuse/core";
import { computed, ref, shallowRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useCreateQuoteMutation } from "@/core/api/graphql";
import { useRouteQueryParam, usePageHead } from "@/core/composables";
import { QueryParamName } from "@/core/enums";
import { Sort } from "@/core/types";
import { PageToolbarBlock, useUserQuotes, QuoteStatus } from "@/shared/account";
import type { SortDirection } from "@/core/enums";
import type { ISortInfo } from "@/core/types";

const { t } = useI18n();
const router = useRouter();
const breakpoints = useBreakpoints(breakpointsTailwind);

usePageHead({
  title: t("pages.account.quotes.meta.title"),
});

const { quotes, fetching, itemsPerPage, pages, page, keyword, sort, fetchQuotes } = useUserQuotes();
const { mutate: createQuote } = useCreateQuoteMutation();

const isMobile = breakpoints.smaller("lg");

const stickyMobileHeaderAnchor = shallowRef<HTMLElement | null>(null);
const stickyMobileHeaderAnchorIsVisible = useElementVisibility(stickyMobileHeaderAnchor);
const stickyMobileHeaderIsVisible = computed<boolean>(() => !stickyMobileHeaderAnchorIsVisible.value && isMobile.value);

const sortQueryParam = useRouteQueryParam<string>(QueryParamName.Sort, {
  defaultValue: "createdDate:desc",
});

const columns = ref<ITableColumn[]>([
  {
    id: "number",
    title: t("pages.account.quotes.quote_number_label"),
    sortable: true,
  },
  {
    id: "createdDate",
    title: t("pages.account.quotes.date_label"),
    sortable: true,
  },
  {
    id: "status",
    title: t("pages.account.quotes.status_label"),
    sortable: true,
    align: "center",
  },
  {
    id: "total",
    title: t("pages.account.quotes.total_label"),
    align: "right",
  },
]);

async function changePage(newPage: number): Promise<void> {
  page.value = newPage;
  window.scroll({ top: 0, behavior: "smooth" });
  await fetchQuotes();
}

function goToQuoteDetails(payload: { id: string; status?: string }): void {
  const pathName: string = payload.status === "Draft" ? "EditQuote" : "ViewQuote";
  const quoteRoute = router.resolve({ name: pathName, params: { quoteId: payload.id } });
  window.open(quoteRoute.fullPath, "_blank")!.focus();
}

async function applyKeyword(): Promise<void> {
  page.value = 1;
  await fetchQuotes();
}

async function resetKeyword(): Promise<void> {
  keyword.value = "";
  page.value = 1;
  await applyKeyword();
}

async function applySorting(sortInfo: ISortInfo): Promise<void> {
  // Workaround. Put Sort in vc-table then delete
  const sortObj = new Sort(sortInfo.column, sortInfo.direction as SortDirection);
  sortQueryParam.value = sortObj.toString();
  sort.value = sortInfo;
  page.value = 1;
  await fetchQuotes();
}

async function requestQuote(): Promise<void> {
  const result = await createQuote();
  const quoteId = result?.data?.createQuote?.id;

  await router.push({ name: "EditQuote", params: { quoteId } });
}

watch(
  () => sortQueryParam.value,
  async (value: string) => {
    await applySorting(Sort.fromString(value));
  },
  {
    immediate: true,
  },
);

void fetchQuotes();
</script>
