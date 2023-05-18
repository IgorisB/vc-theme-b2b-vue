<template>
  <div class="py-10 lg:py-24" :class="model?.background">
    <div class="mx-auto w-full max-w-screen-xl px-5 md:px-12">
      <h2 class="mb-2 text-center text-3xl font-bold lg:mb-4 lg:text-4xl">{{ title || model?.title }}</h2>
      <div class="text-center lg:text-lg">{{ subtitle || model?.subtitle }}</div>

      <div class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        <ProductCardGrid v-for="item in products" :key="item.id" :product="item">
          <template #cart-handler>
            <VcButton v-if="item.hasVariations" :to="productsRoutes[item.id]" class="mb-4 uppercase">
              {{ $t("pages.demo_landing.products_block.choose_button") }}
            </VcButton>

            <AddToCart v-else :product="item"></AddToCart>
          </template>
        </ProductCardGrid>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import { useProductsRoutes } from "@/core/composables";
import { AddToCart } from "@/shared/cart";
import { ProductCardGrid, useProducts } from "@/shared/catalog";

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: Record<string, any>;
  query?: string;
  title?: string;
  subtitle?: string;
  count?: number;
}>();

const { products, fetchProducts } = useProducts();
const productsRoutes = useProductsRoutes(products);

watchEffect(async () => {
  await fetchProducts({
    itemsPerPage: props.count || props.model.count || 4,
    keyword: props.query || props.model.query,
  });
});

onMounted(async () => {
  await fetchProducts({
    itemsPerPage: props.count || props.model.count || 4,
    keyword: props.query || props.model.query,
  });
});
</script>
