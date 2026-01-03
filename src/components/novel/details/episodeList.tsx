"use client"
import Pagination from '@/components/pagination'
import { Episode } from '@/types/episode'
import { BookOpenIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

const EpisodeList = ({ episodes, novelId }: { episodes: Episode[], novelId: string }) => {
  const perPage = 12
  const [page, setPage] = React.useState(1)
  const totalPages = useMemo(()=>{
    return Math.max(1, Math.ceil(episodes.length / perPage))
  }, [episodes.length, perPage])
  const pagedEpisodes = useMemo(()=>{
    const start = (page - 1) * perPage
    return episodes.slice(start, start + perPage)
  }, [episodes, page])
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [page])
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 md:px-8 py-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          ตอนทั้งหมด
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {episodes?.length || 0} ตอน (หน้า {page} จาก {totalPages})
        </p>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-zinc-700">
        {pagedEpisodes?.map((ep) => (
          <div
            key={ep.episode}
            className="group px-6 md:px-8 py-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-zinc-950 dark:text-white mb-1 group-hover:text-primary transition-colors">
                  ตอนที่ {ep.episode}: {ep.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  เผยแพร่เมื่อ {new Date(ep.published_at).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <Link
                href={`/novel/${novelId}/episode/${ep.episode}`} 
                className="cursor-pointer inline-flex w-max items-center gap-2 px-4 py-2 text-sm font-medium text-white
                dark:text-white rounded-lg transition-colors 
                shrink-0 bg-primary/80 hover:bg-primary/90 active:bg-primary">
                <span>อ่านตอนนี้</span>
                <ChevronRightIcon className='w-4 h-4' />
              </Link>
            </div>
          </div>
        ))}

        {(!episodes || episodes.length === 0) && (
          <div className="px-6 md:px-8 py-12 text-center">
            <BookOpenIcon className='w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4' />
            <p className="text-gray-500 dark:text-gray-400">ยังไม่มีตอนที่เผยแพร่</p>
          </div>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  )
}

export default EpisodeList