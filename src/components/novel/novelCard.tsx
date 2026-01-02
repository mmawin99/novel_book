"use client"
import Link from "next/link"
import Image from "next/image"
import {
  BookIcon,
  EyeIcon,
  ClockIcon,
  TagIcon
} from "lucide-react"

export function NovelCard({ novel }) {

  return (
    <div className="group flex gap-4 rounded-xl shadow-xl dark:bg-zinc-900 p-4 hover:shadow-2xl transition">
      <Link
        href={`/novel/${novel.id}`}
        className="relative aspect-4/6 w-28 shrink-0 overflow-hidden rounded-lg"
      >
        <Image
          src={novel.cover}
          alt={novel.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {novel.is_new && (
          <span className="absolute top-2 left-2 rounded-xl bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
            มาใหม่!!
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/novel/${novel.id}`}>
          <h3 className="line-clamp-2 text-lg font-bold hover:underline">
            {novel.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground">
          {novel.publisher.name}
        </p>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <TagIcon size={14} />
            {novel.genre}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon size={14} />
            ตอน {novel.total_episodes}
          </span>
          <span className="inline-flex items-center gap-1">
            <EyeIcon size={14} />
            {novel.views.toLocaleString()}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {novel.description}
        </p>

        <Link
          href={`/novel/${novel.id}`}
          className="
            mt-auto inline-flex w-fit items-center gap-2 rounded-md
            bg-sky-500 px-4 py-2 text-sm font-medium text-white
            hover:bg-sky-600 active:bg-sky-700
          "
        >
          <BookIcon size={16} />
          อ่านนิยาย
        </Link>
      </div>
    </div>
  )
}