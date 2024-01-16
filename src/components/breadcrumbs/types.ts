export interface IBreadcrumb {
  value: string
  label: string
}

export interface IBreadcrumbsProps {
  className?: string
  breadcrumbs: IBreadcrumb[]
  onClick?: (_val: string) => void
}
