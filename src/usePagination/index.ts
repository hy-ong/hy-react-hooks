import { useCallback, useRef, useState } from "react"
import { PaginationHooks, PaginationMeta } from "../types"

export default function usePagination(): PaginationHooks {
  const [meta, setMeta] = useState<PaginationMeta>()
  const refOnPageChange = useRef<(page: number) => void>()

  const setOnPageChange = useCallback((callback: (page: number) => void) => {
    refOnPageChange.current = callback
  }, [])

  const gotoPage = useCallback(
    (page: number) => {
      if (!isMetaValid() || page < 1 || page > meta.totalPages) return
      refOnPageChange.current?.(page)
    },
    [meta, refOnPageChange]
  )

  const goNextPage = useCallback(() => {
    if (isMetaValid() && meta.nextPage) gotoPage(meta.nextPage)
  }, [meta, gotoPage])

  const goPrevPage = useCallback(() => {
    if (isMetaValid() && meta.prevPage) gotoPage(meta.prevPage)
  }, [meta, gotoPage])

  const goFirstPage = useCallback(() => {
    if (isMetaValid()) gotoPage(1)
  }, [meta, gotoPage])

  const goLastPage = useCallback(() => {
    if (isMetaValid()) gotoPage(meta.totalPages)
  }, [meta, gotoPage])

  const isMetaValid = () => meta != null && meta.totalPages >= 1

  return {
    meta,
    setMeta,
    gotoPage,
    goNextPage,
    goPrevPage,
    goFirstPage,
    goLastPage,
    setOnPageChange,
  }
}
