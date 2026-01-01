// src/stores/useBannerStore.ts
import { create } from 'zustand'
import { NovelBanner } from '@/types/banner'
import { BannerService } from '@/services/banner.service'

const BANNER_TTL = 10 * 60 * 1000; // 10 min

type BannerStore = {
  banners: NovelBanner[]
  isLoading: boolean
  lastFetched: number | null

  loadBanners: () => Promise<void>
}

export const useBannerStore = create<BannerStore>((set, get) => ({
  banners: [],
  isLoading: false,
  lastFetched: null,

  loadBanners: async () => {
    const { lastFetched, banners } = get()

    if (banners.length && lastFetched && Date.now() - lastFetched < BANNER_TTL) 
      return

    set({ isLoading: true })

    const data = await BannerService.getBanners()

    set({
      banners: data,
      isLoading: false,
      lastFetched: Date.now(),
    })
  }
}))
