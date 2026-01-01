"use client"

import { useNovelStore } from "@/stores/useNovelStore"
import { useEffect, useMemo, useState } from "react"
import { NovelCard } from "./novelCard"
import { generatePagination } from "@/utils/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"


export function NovelList() {
  const { novels, isLoading, loadNovels } = useNovelStore()

  const perPage = 12
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadNovels()
  }, [loadNovels])

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(novels.length / perPage))
  }, [novels.length])

  const pagination = useMemo(() => {
    return generatePagination(totalPages, page)
  }, [totalPages, page])

  const pagedNovels = useMemo(() => {
    const start = (page - 1) * perPage
    return novels.slice(start, start + perPage)
  }, [novels, page])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [page])

  if (isLoading && novels.length === 0) {
    return (
      <div className="h-40 md:h-60 lg:h-80 rounded-xl bg-gray-200 animate-pulse" />
    )
  }

  if (!novels.length) return null

  return (
    <div className="mx-auto max-w-7xl px-4 mt-6">
      <div className="space-y-8">
        <section>
          <h1 className="text-3xl font-bold tracking-tight">นิยาย</h1>
          <p className="mt-2 text-muted-foreground">
            จำนวนทั้งหมด {novels.length} เรื่อง (หน้า {page} จาก {totalPages})
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
          {pagedNovels.map((novel) => (
            <NovelCard key={`novel:${novel.id}`} novel={novel} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center py-4">
            <nav className="flex items-center gap-1">
              {pagination.map((item, index) => {
                if (item === "...") {
                  return (
                    <span key={index} className="px-3 py-2 text-sm text-muted-foreground">…</span>
                  )
                }

                if (item === "prev") {
                  return (
                    <button
                      key={index}
                      disabled={page === 1}
                      onClick={() =>
                        setPage((p) => Math.max(1, p - 1))
                      }
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed">
                      <ChevronLeft />
                    </button>
                  )
                }

                if (item === "next") {
                  return (
                    <button
                      key={index}
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed">
                      <ChevronRight />
                    </button>
                  )
                }

                return (
                  <button
                    key={index}
                    onClick={() => setPage(item)}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${item === page ? "bg-sky-500 text-white" : "hover:bg-muted"}`}>
                    {item}
                  </button>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
