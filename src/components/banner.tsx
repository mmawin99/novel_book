'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { NovelBanner } from '@/types/banner'

export default function Banner({ banners }: { banners: NovelBanner[] }) {
  if (!banners.length) return null

  return (
    <section className="relative mt-4">
      <div className="relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} banner-bullet-dash"></span>`,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          observer
          observeParents
          updateOnWindowResize
          slidesPerView={1}
          centeredSlides={false}
          breakpoints={{
            768: {
              slidesPerView: 'auto',
              centeredSlides: true,
            },
          }}

          className="overflow-visible!"
        >
          {banners.map((banner) => (
            <SwiperSlide
              key={banner.id}
              className="w-full md:w-[75%]! lg:w-[60%]! md:mx-1.5"
            >
              <div className="relative h-40 md:h-60 lg:h-80 mx-0 md:mx-1.5 overflow-hidden w-full">
                <Image fill src={banner.image} alt="" className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent" />

                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs md:text-sm px-3 py-1 rounded-full">
                  {banner.badge}
                </div>
                <div className='absolute bottom-8 left-8 text-white text-base md:text-lg lg:text-xl xl:text-2xl font-bold'>
                  {banner.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
