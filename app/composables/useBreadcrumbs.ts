export interface Breadcrumb {
  label: string
  to?: string
}

export const useBreadcrumbs = () =>
  useState<Breadcrumb[]>("breadcrumbs", () => [])
