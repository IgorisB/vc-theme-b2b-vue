<template>
  <div class="space-y-6">
    <VcWidget :title="$t(`shared.account.navigation.main_title`)" size="sm">
      <AccountNavigationLink
        :to="{ name: 'Dashboard' }"
        :text="$t('shared.account.navigation.links.dashboard')"
        class="dashboard-icon"
      />

      <AccountNavigationLink
        :to="{ name: 'Profile' }"
        :text="$t('shared.account.navigation.links.profile')"
        class="profile-icon"
      />

      <AccountNavigationLink
        :to="{ name: 'ChangePasswordAccount' }"
        :text="$t('shared.account.navigation.links.change_password')"
        class="pass-icon"
      />

      <AccountNavigationLink
        v-if="!isCorporateMember"
        :to="{ name: 'Addresses' }"
        :text="$t('shared.account.navigation.links.addresses')"
        class="addresses-icon"
      />

      <AccountNavigationLink
        :to="{ name: 'Orders' }"
        :text="$t('shared.account.navigation.links.orders')"
        class="orders-icon"
      />

      <template v-if="isOrdersPage">
        <div
          v-for="facet in facets"
          :key="facet.term"
          class="flex items-center space-x-1 overflow-hidden text-ellipsis px-3 text-sm"
        >
          <VcIcon class="flex-none text-[--color-primary-500]" name="minus" />

          <a
            :class="{ 'font-bold': isSelectedOrderStatus(facet.term) }"
            class="line-clamp-2 flex w-full cursor-pointer gap-1 py-0.5 hover:text-black"
            @click="applyOrderFilter(facet.term)"
          >
            <div class="grow overflow-hidden text-ellipsis text-nowrap">{{ facet.label }}</div>
            <VcBadge variant="outline" rounded>{{ facet.count }}</VcBadge>
          </a>
        </div>
      </template>

      <AccountNavigationLink
        :to="{ name: 'Lists' }"
        :text="$t('shared.account.navigation.links.lists')"
        class="list-icon pb-2"
      />

      <template v-if="isListDetails">
        <div
          v-for="list in lists"
          :key="list.id"
          class="ml-4 flex items-center space-x-2 overflow-hidden text-ellipsis px-3 text-sm"
        >
          <VcIcon class="flex-none text-[--color-primary-500]" name="minus" />

          <router-link
            :to="{ name: 'ListDetails', params: { listId: list.id } }"
            class="line-clamp-2 cursor-pointer py-0.5 font-semibold text-gray-500 hover:text-black"
            active-class="!text-black"
          >
            {{ list.name }}
          </router-link>
        </div>
      </template>

      <AccountNavigationLink
        :to="{ name: 'CheckoutDefaults' }"
        :text="$t('shared.account.navigation.links.checkout_defaults')"
        class="checkout-icon"
      />

      <AccountNavigationLink
        v-if="$cfg.quotes_enabled"
        :to="{ name: 'Quotes' }"
        :text="$t('shared.account.navigation.links.quote_requests')"
        class="quotes-icon"
      />

      <AccountNavigationLink
        :to="{ name: 'SavedCreditCards' }"
        :text="$t('shared.account.navigation.links.saved_credit_cards')"
        class="credit-card"
      />

      <AccountNavigationLink
        v-if="$cfg.push_messages_enabled"
        :to="{ name: 'Notifications' }"
        :text="$t('shared.account.navigation.links.notifications')"
        class="notifications"
      />
    </VcWidget>

    <VcWidget v-if="isCorporateMember" :title="$t(`shared.account.navigation.corporate_title`)" size="sm">
      <AccountNavigationLink
        :to="{ name: 'CompanyInfo' }"
        :text="$t('shared.account.navigation.links.company_info')"
        class="company-icon"
      />

      <AccountNavigationLink
        :to="{ name: 'CompanyMembers' }"
        :text="$t('shared.account.navigation.links.company_members')"
        class="company-members-icon"
      />
    </VcWidget>
  </div>
</template>

<script setup lang="ts">
import { eagerComputed } from "@vueuse/core";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useWishlists } from "@/shared/wishlists";
import { useUserOrders, useUserOrdersFilter } from "..";
import { useUser } from "../composables/useUser";
import AccountNavigationLink from "./account-navigation-link.vue";

const route = useRoute();
const { isCorporateMember } = useUser();
const { lists, fetchWishlists } = useWishlists();
const { facets } = useUserOrders({});
const { filterData, applyFilters } = useUserOrdersFilter();

const isListDetails = eagerComputed(() => route.name === "ListDetails");
const isOrdersPage = eagerComputed(() => route.name === "Orders");

function isSelectedOrderStatus(status: string): boolean {
  return filterData.value.statuses.indexOf(status) !== -1;
}

function applyOrderFilter(status: string): void {
  filterData.value.statuses = [status];
  applyFilters();
}

watchEffect(async () => {
  if (isListDetails.value) {
    await fetchWishlists();
  }
});
</script>
