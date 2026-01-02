import { NovelService } from '@/services/novel.service'
import { EpisodeService } from '@/services/episode.service'
import { Navbar } from '@/components/navbar'

import DetailCard from '@/components/novel/details/detailCard'
import EpisodeList from '@/components/novel/details/episodeList'
import { CircleSlash2Icon } from 'lucide-react'
import ErrorPage from '@/components/errorPage'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function NovelDetailPage({ params }: PageProps) {
  const { id } = await params
  const novel = await NovelService.getNovelById(id)
  if (!novel) {
    return (<ErrorPage text="เราหานิยายที่คุณต้องการไม่เจอ" icon={CircleSlash2Icon} />);
  }

  const episodes = await EpisodeService.getEpisodesByNovelId(id)

  return (
    <>
      <Navbar withSubmenu={false} />
      
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <DetailCard novel={novel} />
          <EpisodeList episodes={episodes} novelId={id} />
        </div>
      </main>
    </>
  )
}