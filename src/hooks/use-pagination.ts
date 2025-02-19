import { useMemo } from 'react'

import { composePaginationRange } from '../lib/pagination'
import type { UsePaginationArgs } from '../lib/typed'

export function usePagination(args: UsePaginationArgs) {
  return useMemo(() => {
    return composePaginationRange({
      page: args.page,
      pages: args.pages,
      rows: args.rows,
    })
  }, [args.page, args.pages, args.rows])
}
