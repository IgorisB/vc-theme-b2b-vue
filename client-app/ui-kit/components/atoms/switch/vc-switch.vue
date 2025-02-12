<template>
  <div
    :class="[
      'vc-switch',
      `vc-switch--color--${color}`,
      `vc-switch--size--${size}`,
      `vc-switch--label--${labelPosition}`,
    ]"
  >
    <!-- Workarounds to fix Firefox label click bug -->
    <button v-if="$slots.default" type="button" class="vc-switch__label" @click="change">
      <slot />
    </button>

    <button type="button" class="vc-switch__bg" @click="change">
      <span class="vc-switch__circle" />
    </button>

    <input
      :id="componentId"
      :value="value"
      :checked="modelValue"
      :aria-checked="modelValue"
      :disabled="disabled"
      type="checkbox"
      @change="change"
    />
  </div>
</template>

<script setup lang="ts">
import { useComponentId } from "@/ui-kit/composables";

export interface IEmits {
  (event: "update:modelValue", value?: boolean): void;
  (event: "change", value: boolean): void;
}

interface IProps {
  modelValue?: boolean;
  disabled?: boolean;
  name?: string;
  value?: boolean;
  color?: VcSwitchColorType;
  size?: "xs" | "sm" | "md" | "lg";
  labelPosition?: "left" | "right";
}

const emit = defineEmits<IEmits>();
const props = withDefaults(defineProps<IProps>(), {
  size: "md",
  color: "primary",
  labelPosition: "left",
});

const componentId = useComponentId("input");

function change() {
  if (props.disabled) {
    return;
  }

  const newValue = !props.modelValue;
  emit("update:modelValue", newValue);
  emit("change", newValue);
}
</script>

<style lang="scss">
.vc-switch {
  $colors: primary, secondary, success, info, neutral, warning, danger, accent;

  $checked: "";
  $disabled: "";
  $bg: "";
  $left: left;
  $right: right;

  --color: var(--color-neutral-300);

  @apply relative inline-flex items-center;

  &--size {
    &--xs {
      --w: 1.25rem;
      --circle-size: 0.625rem;

      @apply text-xxs;
    }

    &--sm {
      --w: 1.5rem;
      --circle-size: 0.75rem;

      @apply text-xs;
    }

    &--md {
      --w: 1.875rem;
      --circle-size: 1rem;

      @apply text-xs;
    }

    &--lg {
      --w: 2.375rem;
      --circle-size: 1.25rem;

      @apply text-sm;
    }
  }

  &:has(input:disabled) {
    $disabled: &;

    --color: var(--color-neutral-200);

    @apply cursor-not-allowed;
  }

  &:has(input:checked) {
    $checked: &;
  }

  @each $color in $colors {
    &--color {
      &--#{$color}#{$checked} {
        --color: var(--color-#{$color}-500);

        &#{$disabled} {
          --color: var(--color-#{$color}-200);
        }
      }
    }
  }

  &--label {
    &--left {
      $left: &;
    }

    &--right {
      $right: &;
    }
  }

  &__label {
    @apply text-neutral-950 font-normal cursor-pointer;

    #{$left} & {
      @apply order-first me-2;
    }

    #{$right} & {
      @apply order-last ms-2;
    }
  }

  input {
    @apply hidden;
  }

  &__bg {
    $bg: &;

    @apply order-1 relative block h-[--circle-size] w-[--w] box-content rounded-full bg-current border border-current text-[--color] p-0.5 cursor-pointer;
  }

  &__circle {
    @apply relative block left-0 size-[--circle-size] bg-additional-50 rounded-full transition-[left];

    #{$checked} & {
      @apply left-[calc(100%-var(--circle-size))];
    }
  }
}
</style>
