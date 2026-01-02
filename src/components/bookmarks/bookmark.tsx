"use client"
import { useBookmarkStore } from "@/stores/useBookmarkStore"
import { BookmarkIcon, CheckIcon, ListIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"

const BulkBookmarkSchema = z.object({
  selected: z
    .array(z.string())
    .min(1, "โปรดเลือกอย่างน้อย 1 รายการ"),
})


const BookmarksList = () => {
  const bookmarks = useBookmarkStore((s) => s.bookmarks)
  const removeBookmark = useBookmarkStore((s) => s.removeBookmark)

  const [isEditMode, setIsEditMode] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const checkedCount = selected.length

  const toggleSelect = (key: string) => {
    setSelected((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    )
  }

  const bulkRemoveBookmarks = async () => {
    const result = BulkBookmarkSchema.safeParse({ selected })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setError(null)

    for (const key of selected) {
      const [novel_id, episode] = key.split("|")
      await removeBookmark(novel_id, Number(episode))
    }

    setSelected([])
    setIsEditMode(false)
  }

  return (
    <div className="container md:mx-auto px-2.5 md:px-0 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-slate-400">
          จำนวนทั้งหมด {bookmarks.length} รายการ
        </div>

        <div className="flex gap-2">
          {!isEditMode ? (
            <button
              onClick={() => setIsEditMode(true)}
              className="flex flex-row gap-2 items-center px-3 py-2 font-medium cursor-pointer
              border border-zinc-300 text-zinc-700 hover:bg-zinc-400 dark:border-zinc-700 
              dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-full"
            >
              แก้ไข
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditMode(false)
                  setSelected([])
                  setError(null)
                }}
                className="flex flex-row gap-2 items-center px-3 py-2 font-medium cursor-pointer
              border border-zinc-300 text-zinc-700 hover:bg-zinc-400 dark:border-zinc-700 
              dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-full"
              >
                ยกเลิก
              </button>

              <button
                onClick={bulkRemoveBookmarks}
                className={`flex flex-row gap-2 items-center px-3 py-2 font-medium cursor-pointer
              border border-zinc-300 text-zinc-700 hover:bg-zinc-400 dark:border-zinc-700 
              dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-full font-mono`}
              >
                <Trash2Icon className="w-4 h-4" />
                {checkedCount}
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-3 text-sm text-red-500">{error}</div>
      )}

      {/* List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((b) => {
          const key = `${b.novel_id}|${b.episode}`
          const checked = selected.includes(key)
          const date = new Date(b.updated_at)
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
            <div key={key} className="flex gap-2" onClick={() => {
              if (isEditMode) {
                toggleSelect(key)
              }
            }}>
              <div className="group flex gap-4 hover:shadow-2xl transition">
                <Link
                  href={`/novel/${b.novel_id}`}
                  className="relative aspect-4/6 w-28 shrink-0 overflow-hidden rounded-lg"
                >
                  <Image
                    src={b.novel_cover}
                    alt={b.novel_title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 select-none"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <Link href={`/novel/${b.novel_id}`}>
                      <h3 className="line-clamp-2 text-lg font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
                        {b.novel_title}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {b.publisher_name}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <ListIcon size={14} />
                      ตอนที่ {b.episode}: {b.episode_title}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookmarkIcon fill={"currentColor"} size={14} />
                      คั่นล่าสุด {datePart} / {timePart} น.
                    </span>
                  </div>
                </div>
                {isEditMode && (
                  <label className="relative flex items-start pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSelect(key)}
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
              {/* <div className="border rounded p-2 w-full">
                <div className="font-medium">{b.novel_title}</div>
                <div className="text-sm text-slate-400">
                  ตอนที่ {b.episode}
                </div>
              </div>
              {isEditMode && (
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSelect(key)}
                />
              )} */}
            </div>
          )
        })}
      </div>
      <div className="w-full h-1 my-2" />
    </div>
  )
}

export default BookmarksList
