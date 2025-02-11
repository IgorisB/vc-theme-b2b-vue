<template>
  <div v-if="quote">
    <div class="space-y-3">
      <VcBreadcrumbs :items="breadcrumbs" />

      <VcTypography tag="h1">
        {{ $t("pages.account.quote_details.title", [quote.number]) }}
      </VcTypography>
    </div>

    <VcLayoutWithRightSidebar>
      <!-- Quote products -->
      <VcWidget size="lg">
        <QuoteLineItems :items="quote.items!" readonly />
      </VcWidget>

      <!-- Quote comment -->
      <VcWidget
        v-if="quote.comment"
        :title="$t('pages.account.quote_details.comment')"
        prepend-icon="document-text"
        size="lg"
      >
        <div class="text-base font-medium">
          {{ quote.comment }}
        </div>
      </VcWidget>

      <template #sidebar>
        <VcWidget :title="$t('pages.account.quote_details.quote_summary')">
          <div class="flex justify-between text-base">
            <span v-t="'pages.account.quote_details.total'" class="font-bold" />

            <span class="text-lg font-extrabold text-success-700">
              <VcPriceDisplay :value="quote.totals?.grandTotalInclTax" />
            </span>
          </div>
        </VcWidget>

        <VcWidget :title="$t('pages.account.quote_details.quote_data')" class="-order-1 lg:order-none">
          <div class="space-y-1">
            <div class="flex text-base">
              <span class="mr-2 font-bold">{{ $t("pages.account.quote_details.created") }}:</span>

              <span>{{ $d(quote.createdDate) }}</span>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-base font-bold">{{ $t("pages.account.quote_details.status") }}:</span>

              <QuoteStatus class="min-w-[7.785rem]" :status="quote.status" />
            </div>
          </div>
        </VcWidget>

        <VcWidget v-if="shippingAddress" :title="$t('pages.account.quote_details.shipping_address')">
          <VcAddressInfo :address="shippingAddress!" />
        </VcWidget>

        <VcWidget v-if="billingAddress" :title="$t('pages.account.quote_details.billing_address')">
          <VcAddressInfo :address="billingAddress!" />
        </VcWidget>
      </template>
    </VcLayoutWithRightSidebar>
  </div>

  <VcLoaderOverlay v-else no-bg />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useBreadcrumbs, usePageHead } from "@/core/composables";
import { QuoteLineItems, useUserQuote, QuoteStatus } from "@/shared/account";

interface IProps {
  quoteId: string;
}

const props = defineProps<IProps>();

const { t } = useI18n();
const { quote, billingAddress, shippingAddress, clearQuote, fetchQuote } = useUserQuote();

usePageHead({
  title: t("pages.account.quote_details.title", [quote!.value?.number]),
});

const breadcrumbs = useBreadcrumbs(() => [
  { title: t("common.links.account"), route: { name: "Account" } },
  { title: t("common.links.quote_requests"), route: { name: "Quotes" } },
  { title: t("pages.account.quote_details.title", [quote?.value?.number]) },
]);

watchEffect(async () => {
  clearQuote();
  await fetchQuote({ id: props.quoteId });
});
</script>
