export type UsePaginationItemTypes = 'prev' | 'next' | 'elipsis' | 'page' | 'hidden'

export type UsePaginationRange = {
  value: number
  type: UsePaginationItemTypes
}

export type UsePaginationArgs = {
  page: number
  pages: number
  rows?: number
}
