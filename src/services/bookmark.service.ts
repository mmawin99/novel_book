import { Bookmark } from '@/types/bookmark'

const MOCK_DELAY = 200

export const BookmarkService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async saveBookmark(bookmark_content: Bookmark): Promise<void> {
    await delay()
    // Can be connect to API later!
  },
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removeBookmark(id: string): Promise<void> {
    await delay()
    // Can be connect to API later!
  },

  async getBookmarks(): Promise<Bookmark[]> {
    await delay()
    return []
  },
}

function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
