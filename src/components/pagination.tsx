import { generatePagination } from "@/utils/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useMemo } from "react"

const Pagination = ({
  page,
  totalPages,
  setPage,
}: {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}) => {
  const pagination = useMemo(() => {
    return generatePagination(totalPages, page)
  }, [totalPages, page])

  return totalPages > 1 ? (
    <div className="flex justify-center py-4">
      <nav className="flex items-center gap-1">
        {pagination.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={index}
                className="px-3 py-2 text-sm text-muted-foreground"
              >
                …
              </span>
            )
          }

          if (item === "prev") {
            return (
              <button
                key={index}
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft />
              </button>
            )
          }

          if (item === "next") {
            return (
              <button
                key={index}
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight />
              </button>
            )
          }

          return (
            <button
              key={index}
              onClick={() => setPage(item)}
              className={`rounded-md px-3 py-2 cursor-pointer text-sm font-medium ${item === page ? "bg-sky-500 text-white" : "hover:bg-muted"
                }`}
            >
              {item}
            </button>
          )
        })}
      </nav>
    </div>
  ) : null
}

export default Pagination
