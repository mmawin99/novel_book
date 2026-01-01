import { episodeMap } from '@/mock_data/episode'
import { Episode } from '@/types/episode'

export const EpisodeService = {
  async getEpisodesByNovelId(
    novelId: string
  ): Promise<Episode[]> {
    await delay()
    return episodeMap[novelId] ?? []
  },
}

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms))
}
