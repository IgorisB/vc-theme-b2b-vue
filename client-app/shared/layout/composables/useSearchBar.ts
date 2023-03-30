import { computed, reactive, readonly, ref, shallowRef, toRef, unref } from "vue";
import { getSearchResults } from "@/api/graphql/catalog";
import { Logger, sleep } from "@/core/utilities";
import { highlightSearchText, prepareSearchText } from "@/shared/layout";
import type { SearchResultsParams } from "@/api/graphql/catalog";
import type { Category, Product } from "@/api/graphql/types";
import type { MaybeRef } from "@vueuse/core";

const DEFAULT_DURATION = 0; // No animation at the moment
const DEFAULT_DROPDOWN_DURATION = 200;

const activeAnimations = reactive<Record<"bar" | "dropdown", Promise<void> | null>>({
  bar: null,
  dropdown: null,
});

const loading = ref(false);
const searchBarVisible = ref(false);
const searchDropdownVisible = ref(false);
const searchPhraseOfUploadedResults = ref("");
const categories = shallowRef<Category[]>([]);
const products = shallowRef<Product[]>([]);
const total = ref(0);

export default (
  options: {
    // @default 300
    animationDuration?: MaybeRef<number>;
    // @default 200
    dropdownAnimationDuration?: MaybeRef<number>;
  } = {}
) => {
  const { animationDuration = DEFAULT_DURATION, dropdownAnimationDuration = DEFAULT_DROPDOWN_DURATION } = options;

  async function showSearchDropdown(): Promise<void> {
    if (searchDropdownVisible.value) {
      return;
    }
    searchDropdownVisible.value = true;
    await sleep(unref(dropdownAnimationDuration));
  }

  async function hideSearchDropdown(): Promise<void> {
    const activeAnimation = toRef(activeAnimations, "dropdown");

    if (activeAnimation.value) {
      return activeAnimation.value;
    }

    if (!searchDropdownVisible.value) {
      return Promise.resolve();
    }

    searchDropdownVisible.value = false;
    activeAnimation.value = sleep(unref(dropdownAnimationDuration)).finally(() => {
      activeAnimation.value = null;
    });

    return activeAnimation.value;
  }

  async function toggleSearchBar(): Promise<void> {
    searchBarVisible.value = !searchBarVisible.value;
    await sleep(unref(animationDuration));
  }

  async function hideSearchBar(): Promise<void> {
    const activeAnimation = toRef(activeAnimations, "bar");

    if (activeAnimation.value) {
      return activeAnimation.value;
    }

    if (!searchBarVisible.value) {
      return Promise.resolve();
    }

    activeAnimation.value = hideSearchDropdown()
      .then(() => {
        searchBarVisible.value = false;
        return sleep(unref(animationDuration));
      })
      .finally(() => {
        activeAnimation.value = null;
      });

    return activeAnimation.value;
  }

  async function searchResults(params: SearchResultsParams) {
    const preparedParams: SearchResultsParams = {
      ...params,
      keyword: prepareSearchText(params.keyword),
    };

    if (searchPhraseOfUploadedResults.value === preparedParams.keyword) {
      return;
    }

    loading.value = true;

    try {
      const {
        categories: { items: categoriesItems = [] },
        products: { items: productsItems = [], totalCount = 0 },
      } = await getSearchResults(preparedParams);

      total.value = totalCount;
      products.value = productsItems;
      categories.value = categoriesItems.map((item) => ({
        ...item,
        name: highlightSearchText(item.name, params.keyword),
      }));

      searchPhraseOfUploadedResults.value = preparedParams.keyword;
    } catch (e) {
      Logger.error(`useSearchBar.${searchResults.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    searchResults,
    toggleSearchBar,
    hideSearchBar,
    showSearchDropdown,
    hideSearchDropdown,
    total: readonly(total),
    loading: readonly(loading),
    searchBarVisible: readonly(searchBarVisible),
    searchDropdownVisible: readonly(searchDropdownVisible),
    searchPhraseOfUploadedResults: readonly(searchPhraseOfUploadedResults),
    categories: computed(() => categories.value),
    products: computed(() => products.value),
  };
};
