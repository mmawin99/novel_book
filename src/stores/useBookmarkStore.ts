import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Bookmark } from '@/types/bookmark'
import { BookmarkService } from '@/services/bookmark.service'

type BookmarkStore = {
  bookmarks: Bookmark[]
  isLoading: boolean

  loadBookmarks: () => Promise<void>
  upsertBookmark: (bookmark: Bookmark) => Promise<void>
  removeBookmark: (novel_id: string, episode: number) => Promise<void>
  bulkRemoveBookmarks: (keys: string[]) => Promise<void>
  getBookmarkByEpisodeAndNovelId: (novel_id: string, episode: number) => Bookmark | undefined
  clearBookmarks: () => void
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      isLoading: false,

      loadBookmarks: async () => {
        set({ isLoading: true })
        try {
          const data = await BookmarkService.getBookmarks()
          set({ bookmarks: data })
        } finally {
          set({ isLoading: false })
        }
      },

      upsertBookmark: async (bookmark) => {
        set((state) => ({
          bookmarks: [
            { ...bookmark, updated_at: new Date().toISOString() },
            ...state.bookmarks.filter(b => !(b.novel_id === bookmark.novel_id && b.episode === bookmark.episode)),
          ],
        }))

        try {
          await BookmarkService.saveBookmark(bookmark)
        } catch (err) {
          console.error('Failed to save bookmark', err)
        }
      },
      // accept array of novel_id and episode like ["novel1|1", "novel2|3"]
      bulkRemoveBookmarks: async (keys: string[]) => {
        const keySet = new Set(keys)

        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (b) => !keySet.has(`${b.novel_id}|${b.episode}`)
          ),
        }))

        try {
          await BookmarkService.removeBookmark(keys)
        } catch (err) {
          console.error('Failed to remove bookmarks', err)
        }
      },
      removeBookmark: async (novel_id, episode) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter(b => !(b.novel_id === novel_id && b.episode === episode)),
        }))

        try {
          await BookmarkService.removeBookmark([`${novel_id}|${episode}`])
        } catch (err) {
          console.error('Failed to remove bookmark', err)
        }
      },

      getBookmarkByEpisodeAndNovelId: (novel_id, episode) =>
        get().bookmarks.find((b) => b.novel_id ===  novel_id && b.episode === episode),

      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: 'my-bookmarks',
    }
  )
)
