import Image from 'next/image'
import { notFound } from 'next/navigation'

import { NovelService } from '@/services/novel.service'
import { EpisodeService } from '@/services/episode.service'
import { Navbar } from '@/components/navbar'
import { BookOpen, ChevronRight, EyeIcon, HeartIcon } from 'lucide-react'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function NovelDetailPage({ params }: PageProps) {
  const { id } = await params

  const novel = await NovelService.getNovelById(id)
  if (!novel) {
    console.log('novel not found:', id)
    notFound()
  }

  const episodes = await EpisodeService.getEpisodesByNovelId(id)

  return (
    <>
      <Navbar withSubmenu={false} />
      
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
              <div className="relative w-full md:w-48 h-64 md:h-72 shrink-0 mx-auto md:mx-0">
                <Image
                  src={novel.cover}
                  alt={novel.title}
                  fill
                  className="object-cover rounded-xl shadow-md"
                  priority
                />
                {novel.is_new && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    มาใหม่!!
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {novel.title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {novel.genre}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      novel.status === 'ongoing' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {novel.status === 'ongoing' ? 'ยังไม่จบ' : 'จบแล้ว'}
                    </span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {novel.description}
                </p>

                <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <EyeIcon className='w-6 h-6' />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {novel.views.toLocaleString()} วิว
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <HeartIcon className='w-6 h-6 text-red-500' />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {novel.likes.toLocaleString()} ถูกใจ
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className='w-6 h-6' />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {novel.total_episodes} ตอน
                    </span>
                  </div>
                </div>

                <div
                  className="
                    mt-auto inline-flex w-fit items-center gap-2 rounded-md
                    bg-sky-500 px-4 py-2 text-sm font-medium text-white
                    hover:bg-sky-600 active:bg-sky-700
                  "
                >
                 เริ่มอ่านตอนที่ 1
                </div>
              </div>
            </div>

            <div className="px-6 md:px-8 py-4 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src={novel.publisher.logo}
                    alt={novel.publisher.name}
                    fill
                    className="object-cover rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">นักเขียน</p>
                  <a
                    href={novel.publisher.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {novel.publisher.name}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 md:px-8 py-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                ตอนทั้งหมด
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {episodes?.length || 0} ตอน
              </p>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-zinc-700">
              {episodes?.map((ep) => (
                <div
                  key={ep.episode}
                  className="group px-6 md:px-8 py-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        ตอนที่ {ep.episode}: {ep.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        เผยแพร่เมื่อ {new Date(ep.published_at).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <button className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors shrink-0 bg-zinc-300 dark:bg-zinc-950">
                      <span>อ่านตอนนี้</span>
                      <ChevronRight className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              ))}

              {(!episodes || episodes.length === 0) && (
                <div className="px-6 md:px-8 py-12 text-center">
                  <BookOpen className='w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4' />
                  <p className="text-gray-500 dark:text-gray-400">ยังไม่มีตอนที่เผยแพร่</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}