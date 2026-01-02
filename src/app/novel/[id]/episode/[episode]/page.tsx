import { NovelService } from '@/services/novel.service'
import { EpisodeService } from '@/services/episode.service'
import { Navbar } from '@/components/navbar'
import { CircleSlash2Icon, EyeOffIcon } from 'lucide-react'
import ErrorPage from '@/components/errorPage'
import { EpisodeReadingPage } from '@/components/EpisodeReading'

type PageProps = {
  params: Promise<{
    id: string
    episode: number
  }>
}

export default async function NovelDetailPage({ params }: PageProps) {
  const { id, episode:epNum } = await params
  const novel = await NovelService.getNovelById(id)
  if(Number.isNaN(epNum) || epNum < 1){
    return (<ErrorPage text="อ๊ะ! คุณระบุหมายเลขตอนไม่ถูกต้อง" withNovel={novel} icon={CircleSlash2Icon} />);
  }
  if (!novel) {
    return (<ErrorPage text="เราหานิยายที่คุณต้องการไม่เจอ" icon={CircleSlash2Icon} />);
  }

  const episodes = await EpisodeService.getEpisodesByNovelId(id)

  if(episodes.length===0){
    return (<ErrorPage text="นิยายเรื่องนี้ยังไม่ได้เผยแพร่" withNovel={novel} icon={EyeOffIcon} />);
  }
  if(!episodes[epNum - 1]){
    return (<ErrorPage text="เราหาตอนที่คุณต้องการไม่เจอ" withNovel={novel} icon={CircleSlash2Icon} />);
  }

  return (
    <>
      <Navbar withSubmenu={false} />
      
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <EpisodeReadingPage novel={novel} episodes={episodes} currentEpisode={episodes[epNum - 1]} epNum={Number(epNum)} />
        </div>
      </main>
    </>
  )
}