<template>
  <TwoColumn class="max-w-screen-lg">
    <template #left>
      <h1 v-t="'pages.500.error_code'" class="text-black-800 mb-5 text-7xl font-black md:text-8xl"></h1>

      <VcTypography tag="h2" variant="h1" class="mb-2">
        {{ $t("pages.500.error_text") }}
      </VcTypography>

      <p v-t="'pages.500.message'" class="mb-10 text-base leading-relaxed text-gray-700 md:text-xl"></p>
      <div>
        <VcButton to="/" class="w-40">
          {{ $t("pages.500.home_button") }}
        </VcButton>
      </div>
    </template>
    <template #right>
      <VcImage src="/static/images/errors/500.webp" :alt="$t('pages.500.img_alt')" class="w-full max-w-md" lazy />
    </template>
  </TwoColumn>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import { TwoColumn } from "@/shared/layout";

const { t } = useI18n();

usePageHead({
  title: `${t("pages.500.error_code")} ${t("pages.500.error_text")}`,
});
</script>

<style scoped lang="scss">
.vc-typography--variant--h1 {
  @apply normal-case;
}
</style>
