<template>
  <span>{{ value?.formattedAmount ?? "N/A" }}</span>
</template>

<script setup lang="ts">
import type { MoneyType } from "@/api/graphql/types";

interface IProps {
  value: MoneyType;
}

defineProps<IProps>();
</script>
