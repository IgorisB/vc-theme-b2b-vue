<template>
  <div :id="id" :class="wrapperClasses">
    <div class="relative mx-auto w-full max-w-screen-xl px-5 md:px-12">
      <div v-if="title" class="mb-6 text-center text-2xl font-bold lg:text-5xl">
        {{ title }}
      </div>
      <div v-if="subtitle" class="text-center text-base">{{ subtitle }}</div>
      <Swiper :slides-per-view="1" :space-between="1" class="w-full" :modules="modules" :navigation="navigationOptions">
        <SwiperSlide v-for="(item, index) in slides" :key="index" class="text-center">
          <div class="vc-slider__image-wrap">
            <VcImage :src="item.image" class="vc-slider__image" :lazy="index > 0" />
            <div v-if="item.title" class="mb-3 text-2xl font-bold uppercase">
              {{ item.title }}
            </div>
            <div v-if="item.text" class="text-sm">{{ item.text }}</div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="vc-slider__navigation">
        <div class="vc-slider__btn vc-slider__btn--prev">
          <VcIcon class="-ml-px" name="chevron-left" />
        </div>

        <div class="vc-slider__btn vc-slider__btn--next">
          <VcIcon class="-mr-px" name="chevron-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core/index";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed } from "vue";
import { BREAKPOINTS } from "@/core/constants";
import type { BreakpointsType } from "@/core/constants";

// synced with config/schemas/sections/slider.json
type SlideHeightType = "small" | "medium" | "large" | "auto";

type SlideType = {
  image: string;
  text: string;
  title: string;
};
interface IProps {
  id: string;
  height?: SlideHeightType;
  background?: string;
  slides?: SlideType[];
  title?: string;
  subtitle?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  height: "auto",
  background: "bg-gray-100",
});

const breakpoints = useBreakpoints(BREAKPOINTS);

type FixedHeightsType = { [K in Exclude<SlideHeightType, "auto">]: { [V in BreakpointsType]: number } };

const FIXED_HEIGHTS: FixedHeightsType = {
  small: { xs: 250, sm: 250, md: 400, lg: 400, xl: 450, "2xl": 450 },
  medium: { xs: 300, sm: 300, md: 450, lg: 450, xl: 500, "2xl": 500 },
  large: { xs: 350, sm: 350, md: 500, lg: 500, xl: 550, "2xl": 550 },
};

const imageHeight = computed(() => {
  const currentBreakpoint = (breakpoints.current().value.at(-1) || "xs") as BreakpointsType;

  return props.height === "auto" ? "auto" : `${FIXED_HEIGHTS[props.height][currentBreakpoint]}px`;
});

const navigationOptions = computed(() => {
  return {
    prevEl: `#${props.id} .vc-slider__btn--prev`,
    nextEl: `#${props.id} .vc-slider__btn--next`,
    lockClass: "vc-slider__btn--lock",
    hiddenClass: "vc-slider__btn--hidden",
    disabledClass: "vc-slider__btn--disabled",
  };
});

const modules = [Navigation];

const wrapperClasses = computed(() => {
  return {
    [props.background]: true,
    "py-10 lg:py-24": props.title || props.subtitle,
  };
});
</script>

<style lang="scss" scoped>
.vc-slider {
  $self: &;

  --navigation-size: 36px;
  --navigation-offset: 0px;

  &__btn {
    @apply absolute top-1/2 z-10 w-[var(--navigation-size)] h-[var(--navigation-size)]
    flex items-center justify-center text-primary cursor-pointer;

    margin-top: calc(0px - (var(--navigation-size) / 2) - var(--navigation-offset));

    &--prev {
      @apply left-2 -translate-y-1/2;
    }

    &--next {
      @apply right-2 -translate-y-1/2;
    }

    &--disabled {
      @apply cursor-auto pointer-events-none opacity-30;
    }

    &--lock {
      @apply hidden;
    }
  }

  &__image-wrap {
    height: v-bind(imageHeight);
  }

  &__image {
    @apply w-full h-full object-cover object-left;
  }
}
</style>
