import { Bookmark } from '@/types/bookmark'
import { novelList } from '@/mock_data/novel'
import { episodeMap } from '@/mock_data/episode'

const MOCK_DELAY = 200

export const BookmarkService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async saveBookmark(bookmark_content: Bookmark): Promise<void> {
    await delay()
    // Can be connect to API later!
  },
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removeBookmark(keyArray: string[]): Promise<void> {
    await delay()
    // Can be connect to API later!
  },

  async getBookmarks(): Promise<Bookmark[]> {
    await delay()
    return []
  },
  async getRandomBookmark(): Promise<Bookmark> {
    await delay()
    const randomNovelIndex = Math.floor(Math.random() * novelList.length)
    const novel = novelList[randomNovelIndex]
    const episodeMin = 1
    const episodeMax = novel.total_episodes
    const randomEpisodeNumber = Math.floor(Math.random() * (episodeMax - episodeMin + 1)) + episodeMin
    const episode = episodeMap[novel.id][randomEpisodeNumber - 1]
    return {
      novel_id: novel.id,
      novel_title: novel.title,
      novel_cover: novel.cover,
      publisher_name: novel.publisher.name,
      episode: episode.episode,
      episode_title: episode.title,
      updated_at: new Date().toISOString(),
    }
  }
}

function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
