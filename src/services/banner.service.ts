import { NovelBanner } from '@/types/banner'
import { novelBanner } from '@/mock_data/banner'

export const BannerService = {
  async getBanners(): Promise<NovelBanner[]> {
    return novelBanner
  },
}
