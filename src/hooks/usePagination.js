import { useState } from "react"

const usePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(0)
  const lastContentIndex = page * contentPerPage
  const firstContentIndex = lastContentIndex - contentPerPage
  const changePage = (direction) => {
    setPage((state) => {
      if (direction) {
        if (state === count - 1) {
          return state
        }
        return state + 1
      } else {
        if (state === 0) {
          return state
        }
        return state - 1
      }
    })
  }

  const setPageSAFE = (num) => {
    if (num > pageCount) {
      setPage(pageCount)
    } else if (num < 1) {
      setPage(1)
    } else {
      setPage(num)
    }
  }

  return {
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
  }
}

export default usePagination
