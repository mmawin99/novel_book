"use client"
import { Novel } from '@/types/novel'
import { BookOpenIcon, EyeIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const DetailCard = ({ novel, withButton = true }: { novel: Novel, withButton?: boolean }) => {
  const router = useRouter();
  const handleReadClick = (episodeNumber: number) => {
    router.push(`/novel/${novel.id}/episode/${episodeNumber}`);
  }
  return (
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
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
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
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${novel.status === 'ongoing'
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
              <BookOpenIcon className='w-6 h-6' />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {novel.total_episodes} ตอน
              </span>
            </div>
          </div>
          {withButton && (
            <div className='flex flex-row gap-2'>
              <div className="mt-auto inline-flex w-fit items-center gap-2 rounded-md
                bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 active:bg-sky-700 cursor-pointer"
                onClick={() => {
                  handleReadClick(1);
                }}
              >
                <BookOpenIcon size={16} />
                เริ่มอ่านนิยาย
              </div>
            </div>
          )}
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
  )
}

export default DetailCard