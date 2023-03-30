import type { Breadcrumb } from "@/api/graphql/types";

export function buildBreadcrumbs(items?: Breadcrumb[]): IBreadcrumb[] | undefined {
  return items?.map<IBreadcrumb>(({ title, seoPath }) => ({
    title,
    route: seoPath?.startsWith("/") ? seoPath : "/" + seoPath,
  }));
}
