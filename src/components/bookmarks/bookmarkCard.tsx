import { Bookmark } from '@/types/bookmark'
import { BookmarkIcon, CheckIcon, ListIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TitleCard = ({ title }: { title: string }) => {
  return (
    <h3 className="line-clamp-2 text-lg font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
      {title}
    </h3>
  )
}
const ImageCard = ({ src, alt }: { src: string, alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform group-hover:scale-105 select-none"
    />
  )
}
const BookmarkCard = ({
  bookmark,
  isEditMode,
  checked,
  toggleSelect,
}: {
  bookmark: Bookmark
  isEditMode: boolean
  checked: boolean
  toggleSelect: () => void
}) => {
  const date = new Date(bookmark.updated_at)
  const datePart = date.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  })
  const timePart = date.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <div className="group flex gap-4 hover:shadow-2xl transition w-full">
      {
        isEditMode ? (
          <div className="relative aspect-4/6 w-28 shrink-0 overflow-hidden rounded-lg">
            <ImageCard src={bookmark.novel_cover} alt={bookmark.novel_title} />
          </div>
        )
          :
          (
            <Link href={`/novel/${bookmark.novel_id}/episode/${bookmark.episode}`} className="relative aspect-4/6 w-28 shrink-0 overflow-hidden rounded-lg">
              <ImageCard src={bookmark.novel_cover} alt={bookmark.novel_title} />
            </Link>
          )
      }

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className='w-full flex flex-row justify-between'>
          <div className="flex flex-col gap-2">
            {
              isEditMode ? (<TitleCard title={bookmark.novel_title} />) :
                (<Link href={`/novel/${bookmark.novel_id}/episode/${bookmark.episode}`}><TitleCard title={bookmark.novel_title} /></Link>)
            }

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {bookmark.publisher_name}
            </p>
          </div>
          {isEditMode && (
            <label className="relative flex items-start pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={toggleSelect}
                className="peer sr-only"
              />

              <div
                className="
              w-5.5 h-5.5 rounded-full border-2 border-zinc-400
              peer-checked:bg-blue-500
              peer-checked:border-blue-500
              flex items-center justify-center
              transition
            "
              >
                {checked && <CheckIcon />}
              </div>
            </label>
          )}
        </div>

        <div className="flex flex-col flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1">
            <ListIcon size={14} />
            ตอนที่ {bookmark.episode}: {bookmark.episode_title}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookmarkIcon fill={"currentColor"} size={14} />
            คั่นล่าสุด {datePart} / {timePart} น.
          </span>
        </div>
      </div>
    </div>
  )
}

export default BookmarkCard