<template>
  <router-link v-slot="{ href, navigate, isActive, isExactActive }" :to="link.route ?? ''" custom>
    <component
      :is="isLink ? 'a' : 'button'"
      :href="isLink ? href : null"
      :class="[
        'flex min-h-[2.25rem] items-center gap-x-3.5 text-left leading-tight tracking-[0.01em]',
        isLink && (isActive || isExactActive)
          ? 'text-[--mobile-menu-link-active-color]'
          : 'text-[--mobile-menu-link-color]',
        $attrs.class,
      ]"
      @click.prevent="click(navigate)"
    >
      <slot name="icon" v-bind="{ isActive, isExactActive }">
        <svg
          v-if="link.icon"
          height="36"
          width="36"
          :class="[
            'shrink-0',
            isLink && (isActive || isExactActive)
              ? 'text-[--mobile-menu-icon-active-color]'
              : 'text-[--mobile-menu-icon-color]',
          ]"
        >
          <use :href="link.icon" />
        </svg>
      </slot>

      <span class="line-clamp-3 break-words">
        <slot v-bind="{ isActive, isExactActive }" />
      </span>

      <VcBadge v-if="count" variant="solid-light" color="info" size="lg" rounded>
        {{ $n(count, "decimal", { notation: "compact" }) }}
      </VcBadge>

      <VcIcon v-if="isParent" class="ml-auto text-[--color-primary-500]" name="chevron-right" />
    </component>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ExtendedMenuLinkType } from "@/core/types";
import type { NavigationFailure } from "vue-router";

interface IEmits {
  (event: "select"): void;
  (event: "close"): void;
}

interface IProps {
  link: ExtendedMenuLinkType;
  count?: number;
}

const emit = defineEmits<IEmits>();
const props = withDefaults(defineProps<IProps>(), {
  count: 0,
});

const isParent = computed<boolean>(() => !!props.link.children?.length);
const isLink = computed<boolean>(() => !!props.link.route);

function click(navigate: () => Promise<void | NavigationFailure>) {
  if (isParent.value) {
    emit("select");
  } else {
    navigate();
    emit("close");
  }
}
</script>
