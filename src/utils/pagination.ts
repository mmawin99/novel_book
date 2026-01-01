export type PaginationItem = number | "prev" | "next" | "..."

export function generatePagination(
  totalPage: number,
  currentPage: number,
  siblingCount = 1
): PaginationItem[] {
  const items: PaginationItem[] = []

  if (totalPage <= 0) return items

  const current = Math.max(1, Math.min(currentPage, totalPage))

  items.push("prev")

  const totalNumbers = siblingCount * 2 + 5
  const totalBlocks = totalNumbers + 2

  if (totalPage <= totalBlocks) {
    for (let i = 1; i <= totalPage; i++) items.push(i)
  } else {
    const leftSibling = Math.max(current - siblingCount, 1)
    const rightSibling = Math.min(current + siblingCount, totalPage)

    const showLeftDots = leftSibling > 2
    const showRightDots = rightSibling < totalPage - 1

    if (!showLeftDots && showRightDots) {
      const leftRange = 3 + siblingCount * 2
      for (let i = 1; i <= leftRange; i++) items.push(i)
      items.push("...")
      items.push(totalPage)
    }

    if (showLeftDots && !showRightDots) {
      items.push(1)
      items.push("...")
      for (
        let i = totalPage - (2 + siblingCount * 2);
        i <= totalPage;
        i++
      ) {
        items.push(i)
      }
    }

    if (showLeftDots && showRightDots) {
      items.push(1)
      items.push("...")
      for (let i = leftSibling; i <= rightSibling; i++) {
        items.push(i)
      }
      items.push("...")
      items.push(totalPage)
    }
  }

  items.push("next")

  return items
}