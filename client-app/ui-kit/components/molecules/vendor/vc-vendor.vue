<template>
  <div :class="['vc-vendor', { 'vc-vendor--not-available': !vendor?.name }]">
    <VcIcon name="vendor" size="sm" class="vc-vendor__icon" />

    <span class="vc-vendor__title">
      {{ $t("common.labels.vendor") }}:

      <span class="vc-vendor__name">
        {{ vendor?.name || $t("common.labels.not_available") }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { CommonVendor } from "@/core/api/graphql/types";

interface IProps {
  vendor?: CommonVendor;
}

defineProps<IProps>();
</script>

<style lang="scss">
.vc-vendor {
  $notAvailable: "";

  @apply flex gap-x-1.5 items-center min-w-0 text-primary;

  &--not-available {
    $notAvailable: &;
  }

  &__icon {
    @apply flex-none;
  }

  &__title {
    @apply font-bold uppercase text-base truncate;
  }

  &__name {
    #{$notAvailable} & {
      @apply text-neutral-400;
    }
  }
}
</style>
