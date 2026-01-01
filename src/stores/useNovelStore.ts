import { create } from 'zustand'
import { Novel } from '@/types/novel'
import { NovelService } from '@/services/novel.service'

type NovelStore = {
  novels: Novel[]
  isLoading: boolean
  loadNovels: () => Promise<void>
}

export const useNovelStore = create<NovelStore>((set) => ({
  novels: [],
  isLoading: false,

  loadNovels: async () => {
    set({ isLoading: true })
    const data = await NovelService.getNovels()
    set({ novels: data, isLoading: false })
  }
}))