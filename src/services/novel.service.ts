import { Novel } from '@/types/novel'
import { novelList } from '@/mock_data/novel'

const MOCK_DELAY = 300

export const NovelService = {
  async getNovels(): Promise<Novel[]> {
    await delay()
    return novelList
  },

  async getNovelById(id: string): Promise<Novel | undefined> {
    await delay()
    return novelList.find((novel) => novel.id === id)
  },
}

function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
