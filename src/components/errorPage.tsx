import React from 'react'
import { Navbar } from './navbar'
import { LucideIcon } from 'lucide-react'
import { Novel } from '@/types/novel'
import DetailCard from './novel/details/detailCard'

const ErrorPage = ({
  text = "อ๊ะ! ดูเหมือนว่าจะมีบางอย่างผิดพลาด",
  icon: Icon,
  withNovel,
}: {
  text?: string
  icon: LucideIcon
  withNovel?: Novel
}) => {
  return (
      <>
        <Navbar withSubmenu={false} />
        <main className="min-h-[calc(100vh-56px)]">
          {
            withNovel && (
              <DetailCard withButton={false} novel={withNovel} />
            )
          }
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="px-6 md:px-8 py-12 text-center">
              <Icon className='w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4' />
              <p className="text-gray-500 dark:text-gray-400">{text}</p>
            </div>
          </div>
        </main>
      </>
    )
}

export default ErrorPage