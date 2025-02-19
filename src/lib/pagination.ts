import { makeArray, toInt } from '@/lib/utils'

import type { UsePaginationArgs, UsePaginationRange } from './typed'

function getDefaultPagination(): Array<UsePaginationRange> {
  return [
    { type: 'prev', value: 1 },
    { type: 'page', value: 1 },
    { type: 'next', value: 1 },
  ]
}

function createRange(value: number) {
  return (type: UsePaginationRange['type']): UsePaginationRange => ({ value, type })
}

function isPrevButton(value: number): boolean {
  return value === 0
}

function isNextButton(value: number, items: number[]): boolean {
  return items.length - 1 === value
}

function isEllipsis(value: number, page: number, hasEllipsis: boolean, items: number[]): boolean {
  let leftEllipsis = toInt(items[2], 0)
  let siblingRightElipsis = toInt(items[items.length - 4])
  let lastThreeItem = items.slice(-3)
  let rightElipsisPosition = toInt(lastThreeItem[0])

  return (
    (hasEllipsis && page > 3 && value === leftEllipsis) ||
    (hasEllipsis && page < siblingRightElipsis && value == rightElipsisPosition)
  )
}

function isHidden(value: number, page: number, hasElipsis: boolean, items: number[]) {
  const firstPage = toInt(items[1])
  const lastPage = toInt(items[items.length - 2])
  const leftElipsis = toInt(items[2])
  const lastSixPage = items.slice(-5, -1)
  const firstLastSixPage = toInt(lastSixPage[0])
  const rightElipsis = toInt(lastSixPage[lastSixPage.length - 2])
  const middlePage = page >= 3 && page <= firstLastSixPage

  const middleLeftSibling = toInt(items[page - 1]) === value
  const middleRightSibling = toInt(items[page + 1]) === value

  if (!hasElipsis) return false

  return (
    (page < 3 &&
      value > 3 &&
      value !== lastPage &&
      value !== rightElipsis &&
      !isNextButton(value, items)) ||
    (page > firstLastSixPage &&
      value <= firstLastSixPage &&
      value !== firstPage &&
      value !== leftElipsis &&
      !isPrevButton(value)) ||
    (middlePage &&
      value !== page &&
      !isPrevButton(value) &&
      !isNextButton(value, items) &&
      !middleLeftSibling &&
      !middleRightSibling &&
      value !== leftElipsis &&
      value !== rightElipsis &&
      value !== lastPage &&
      value !== firstPage)
  )
}

export function composePaginationRange(meta: Pick<UsePaginationArgs, 'pages' | 'page' | 'rows'>) {
  if (meta.pages <= 1) return getDefaultPagination()

  let hasEllipsis = true
  let totalButtons = meta.pages + 2

  let createItems = makeArray((n) => n)
  let items = createItems(totalButtons)

  return items.map((value, _index, items) => {
    let addRange = createRange(value)

    if (isPrevButton(value)) return addRange('prev')
    if (isNextButton(value, items)) return addRange('next')

    if (isEllipsis(value, meta.page, hasEllipsis, items)) return addRange('elipsis')
    if (isHidden(value, meta.page, hasEllipsis, items)) return addRange('hidden')

    return addRange('page')
  })
}
