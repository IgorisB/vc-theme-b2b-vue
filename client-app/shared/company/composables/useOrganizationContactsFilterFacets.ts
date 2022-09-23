import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import _ from "lodash";
import { computedEager } from "@vueuse/core";
import { ORGANIZATION_EMPLOYEE, ORGANIZATION_MAINTAINER, PURCHASING_AGENT } from "@/core/constants";
import { FacetItem, FacetValueItem } from "@/core/types";
import { ContactStatus } from "@/shared/company";

export default function useOrganizationContactsFilterFacets() {
  const { t } = useI18n();

  const initialFacets: FacetItem[] = [
    {
      label: t("pages.company.members.labels.role"),
      paramName: "roleId",
      type: "terms",
      values: [
        { label: t("common.roles." + ORGANIZATION_MAINTAINER.id), value: ORGANIZATION_MAINTAINER.id, selected: false },
        { label: t("common.roles." + ORGANIZATION_EMPLOYEE.id), value: ORGANIZATION_EMPLOYEE.id, selected: false },
        { label: t("common.roles." + PURCHASING_AGENT.id), value: PURCHASING_AGENT.id, selected: false },
      ],
    },
    {
      label: t("pages.company.members.labels.status"),
      paramName: "status",
      type: "terms",
      values: [
        { label: t("pages.company.members.statuses.active"), value: ContactStatus.Approved, selected: false },
        { label: t("pages.company.members.statuses.inactive"), value: ContactStatus.New, selected: false },
        { label: t("pages.company.members.statuses.blocked"), value: ContactStatus.Rejected, selected: false },
      ],
    },
  ];

  const appliedFacets = ref<FacetItem[]>(_.cloneDeep(initialFacets));
  const selectableFacets = ref<FacetItem[]>(_.cloneDeep(initialFacets));

  const isFacetsDirty = computedEager<boolean>(() => {
    return !_.isEqual(appliedFacets.value, selectableFacets.value);
  });

  const numberOfFacetsApplied = computedEager<number>(() =>
    appliedFacets.value.reduce((result, filterFacet) => {
      return result + filterFacet.values.filter((value) => value.selected).length;
    }, 0)
  );

  function applyFacets() {
    if (isFacetsDirty.value) {
      appliedFacets.value = _.cloneDeep(selectableFacets.value);
    }
  }

  function resetFacets() {
    appliedFacets.value = _.cloneDeep(initialFacets);
    selectableFacets.value = _.cloneDeep(initialFacets);
  }

  function resetSelectableToAppliedFacets() {
    selectableFacets.value = _.cloneDeep(appliedFacets.value);
  }

  function resetFacetItem(payload: Pick<FacetItem, "paramName"> & Pick<FacetValueItem, "value">) {
    const facet = appliedFacets.value.find((item) => item.paramName === payload.paramName);
    const facetValue = facet?.values.find((item) => item.value === payload.value);

    if (!facetValue?.selected) {
      return;
    }

    facetValue.selected = false;
    resetSelectableToAppliedFacets();
  }

  return {
    selectableFacets,
    isFacetsDirty,
    numberOfFacetsApplied,
    applyFacets,
    resetFacets,
    resetSelectableToAppliedFacets,
    resetFacetItem,
    appliedFacets: computed(() => appliedFacets.value),
  };
}