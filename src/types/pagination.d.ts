export type PaginationMeta = {
  count: number
  currentPage: number
  currentPerPage: number
  firstPage: boolean
  lastPage: boolean
  nextPage: number | null
  prevPage: number | null
  totalPages: number
}

export type PaginationHooks = {
  meta?: PaginationMeta
  setMeta: (meta: PaginationMeta) => void
  gotoPage: (page: number) => void
  goNextPage: () => void
  goPrevPage: () => void
  goFirstPage: () => void
  goLastPage: () => void
  setOnPageChange: (callback: (page: number) => void) => void
}
