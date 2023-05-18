<template>
  <div>
    <div v-if="canShowContent">
      <RenderContent model="page" :content="content" :api-key="apiKey" :custom-components="getRegisteredComponents()" />
    </div>
    <NotFound v-if="pageNotFound" />
  </div>
</template>

<script setup lang="ts">
import { getContent, RenderContent, isPreviewing } from "@builder.io/sdk-vue/vue3";
import { onMounted, ref } from "vue";
import NotFound from "./404.vue";
import Login from "@/shared/static-content/components/login.vue";
import ProductsBlock from "@/shared/static-content/components/products-block.vue";

const canShowContent = ref(true);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const content: any = ref(null);
const pageNotFound = ref(false);
const apiKey = "<public api key>";

onMounted(async () => {
  const result = await getContent({
    model: "page",
    apiKey: apiKey,
    userAttributes: {
      urlPath: window.location.pathname,
    },
  });
  content.value = result;
  canShowContent.value = content.value || isPreviewing();
  if (!content.value) {
    pageNotFound.value = true;
  }
});

function getRegisteredComponents() {
  return [
    {
      component: Login,
      name: "VirtoCommerce Login",
      canHaveChildren: false,
      image: "https://tabler-icons.io/static/tabler-icons/icons-png/3d-cube-sphere-off.png",
      inputs: [],
    },
    {
      component: ProductsBlock,
      name: "VirtoCommerce Products",
      canHaveChildren: false,
      image: "https://tabler-icons.io/static/tabler-icons/icons-png/building-store.png",
      inputs: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "subtitle",
          type: "string",
        },
        {
          name: "query",
          type: "string",
        },
        {
          name: "count",
          type: "number",
        },
      ],
    },
  ];
}
</script>
