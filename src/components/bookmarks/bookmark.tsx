"use client"
import { BookmarkService } from "@/services/bookmark.service"
import { useBookmarkStore } from "@/stores/useBookmarkStore"
import { Bookmark } from "@/types/bookmark"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import BookmarkCard from "./bookmarkCard"

const BulkBookmarkSchema = z.object({
  selected: z
    .array(z.string())
    .min(1, "โปรดเลือกอย่างน้อย 1 รายการ"),
})


const BookmarksList = () => {
  const bookmarks = useBookmarkStore((s) => s.bookmarks)
  const removeBookmarks = useBookmarkStore((s) => s.bulkRemoveBookmarks)
  const upsertBookmark = useBookmarkStore((s) => s.upsertBookmark)
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
  const addRandomBookmark = async () => {
    const newBookmark: Bookmark = await BookmarkService.getRandomBookmark()
    upsertBookmark(newBookmark)
    toast.success("เพิ่มรายการคั่นหน้าเรียบร้อยแล้ว")
  }
  const bulkRemoveBookmarks = async () => {
    const result = BulkBookmarkSchema.safeParse({ selected })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setError(null)

    await removeBookmarks(selected)
    toast.success("ลบรายการที่คั่นหน้าที่เลือกเรียบร้อยแล้ว")

    setSelected([])
    setIsEditMode(false)
  }

  return (
    <div className="md:max-w-screen-md lg:max-w-screen-lg mx-auto px-2.5 md:px-0 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-slate-400">
          จำนวนทั้งหมด {bookmarks.length} รายการ
        </div>

        <div className="flex gap-2">
          {!isEditMode ? (
            <>
              <button
                onClick={() => addRandomBookmark()}
                className="flex flex-row gap-2 items-center px-3 py-2 font-medium cursor-pointer
                border border-zinc-300 text-zinc-700 hover:bg-zinc-400 dark:border-zinc-700 
                dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-full"
              >
                เพิ่ม
              </button>
              <button
                onClick={() => setIsEditMode(true)}
                className="flex flex-row gap-2 items-center px-3 py-2 font-medium cursor-pointer
                border border-zinc-300 text-zinc-700 hover:bg-zinc-400 dark:border-zinc-700 
                dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-full"
              >
                แก้ไข
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => addRandomBookmark()}
                className="flex flex-row gap-2 items-center px-3 py-2 font-medium cursor-pointer
                border border-zinc-300 text-zinc-700 hover:bg-zinc-400 dark:border-zinc-700 
                dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-full"
              >
                เพิ่ม
              </button>
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

      {/* Bookmark List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((b) => {
          const key = `${b.novel_id}|${b.episode}`
          const checked = selected.includes(key)

          return (
            <div key={key} className="flex gap-2 cursor-pointer" onClick={() => {
              if (isEditMode) toggleSelect(key)
            }}>
              <BookmarkCard 
                bookmark={b}
                isEditMode={isEditMode}
                checked={checked}
                toggleSelect={()=> toggleSelect(key)}
              />
            </div>
          )
        })}
      </div>
      <div className="w-full h-1 my-2" />
    </div>
  )
}

export default BookmarksList
