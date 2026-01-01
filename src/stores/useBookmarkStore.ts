import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Bookmark } from '@/types/bookmark'
import { BookmarkService } from '@/services/bookmark.service'

type BookmarkStore = {
  bookmarks: Bookmark[]
  isLoading: boolean

  loadBookmarks: () => Promise<void>
  upsertBookmark: (bookmark: Bookmark) => Promise<void>
  removeBookmark: (novel_id: string) => Promise<void>

  getBookmarkByNovelId: (novel_id: string) => Bookmark | undefined
  clearBookmarks: () => void
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      isLoading: false,

      loadBookmarks: async () => {
        set({ isLoading: true })
        const data = await BookmarkService.getBookmarks()
        set({ bookmarks: data, isLoading: false })
      },

      upsertBookmark: async (bookmark) => {
        set({ isLoading: true })

        await BookmarkService.saveBookmark(bookmark)

        set((state) => ({
          bookmarks: [
            ...state.bookmarks.filter(
              (b) => b.novel_id !== bookmark.novel_id
            ),
            {
              ...bookmark,
              updated_at: new Date().toISOString(),
            },
          ],
          isLoading: false,
        }))
      },
      removeBookmark: async (novel_id) => {
        set({ isLoading: true })

        await BookmarkService.removeBookmark(novel_id)

        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (b) => b.novel_id !== novel_id
          ),
          isLoading: false,
        }))
      },
      getBookmarkByNovelId: (novel_id) =>
        get().bookmarks.find((b) => b.novel_id === novel_id),

      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: 'novel-bookmarks',
    }
  )
)