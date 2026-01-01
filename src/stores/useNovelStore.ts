import { create } from 'zustand'
import { Novel } from '@/types/novel'
import { NovelService } from '@/services/novel.service'
import { EpisodeService } from '@/services/episode.service'
import { Episode } from '@/types/episode'

type NovelStore = {
  novels: Novel[]
  isLoading: boolean

  loadNovels: () => Promise<void>
  getNovelById: (id: string) => Promise<Novel | undefined>
  getEpisodesByNovelId: (id: string) => Promise<Episode[] | undefined>
}

export const useNovelStore = create<NovelStore>((set) => ({
  novels: [],
  isLoading: false,

  loadNovels: async () => {
    set({ isLoading: true })
    const data = await NovelService.getNovels()
    set({ novels: data, isLoading: false })
  },

  getNovelById: async (id) => {
    set({ isLoading: true })
    const novel = await NovelService.getNovelById(id)
    set({ isLoading: false })
    return novel
  },
  getEpisodesByNovelId: async (id) => {
    set({ isLoading: true })
    const episodes = await EpisodeService.getEpisodesByNovelId(id)
    set({ isLoading: false })
    return episodes
  }
}))