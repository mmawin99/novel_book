"use client"

import { useEffect, useMemo, useState } from "react"
import { NovelCard } from "./novelCard"
import { Novel } from "@/types/novel"
import Pagination from  "@/components/pagination"


export function NovelList({novels}: { novels: Novel[] }) {
  const perPage = 12
  const [page, setPage] = useState(1)
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(novels.length / perPage))
  }, [novels.length, perPage])
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
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  )
}
