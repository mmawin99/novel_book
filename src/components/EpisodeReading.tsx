"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, List, Bookmark, Home, XIcon, Loader, BookMarkedIcon, EyeIcon, HeartIcon } from "lucide-react"
import { Novel } from "@/types/novel"
import { Episode } from "@/types/episode"
import Image from "next/image"
import { useBookmarkStore } from "@/stores/useBookmarkStore"
import { toast } from "sonner"

interface EpisodeReadingPageProps {
  novel: Novel
  episodes: Episode[]
  currentEpisode: Episode
  epNum: number
}

export function EpisodeReadingPage({ novel, episodes, currentEpisode, epNum }: EpisodeReadingPageProps) {
  const [isListOpen, setIsListOpen] = useState(false)
  const [isNavigate, setIsNavigate] = useState(false)
  const upsertBookmark = useBookmarkStore(s => s.upsertBookmark)
  const removeBookmark = useBookmarkStore(s => s.removeBookmark)
  const getEpisodeLink = (episodeNumber: number) => `/novel/${novel.id}/episode/${episodeNumber}`;
  const prevEpisode = epNum > 1 ? epNum - 1 : null
  const nextEpisode = epNum < novel.total_episodes ? epNum + 1 : null
  const isBookmarked = useBookmarkStore(
    (state) =>
      state.bookmarks.some(
        (b) => b.novel_id === novel.id && b.episode === epNum
      )
  )
  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(novel.id, epNum)
      toast.success("ลบรายการคั่นหน้าเรียบร้อยแล้ว")
    } else {
      upsertBookmark({
        novel_id: novel.id,
        episode: epNum,
        novel_title: novel.title,
        publisher_name: novel.publisher.name,
        episode_title: currentEpisode.title,
        novel_cover: novel.cover,
        updated_at: new Date().toISOString(),
      })
      toast.success("เพิ่มรายการคั่นหน้าเรียบร้อยแล้ว")
    }
  }
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Reading Card */}
      <div className="bg-card text-card-foreground shadow-sm dark:bg-zinc-900 overflow-hidden">
        {/* Header - 3 Sections */}
        <header className="grid grid-cols-3 items-center px-4 py-3 border-b border-zinc-500 dark:border-zinc-950 sticky top-0 bg-card/95 backdrop-blur-sm z-10">
          {/* Left: Episode List Popup */}
          <div className="relative">
            <button
              onClick={() => setIsListOpen(!isListOpen)}
              className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors flex items-center gap-2"
              aria-label="List of episodes"
            >
              <BookMarkedIcon size={20} />
              <span className="hidden sm:inline text-sm font-medium">สารบัญ</span>
            </button>
          </div>

          {/* Center: Current Episode Number */}
          <div className="text-center font-bold text-lg">ตอนที่ {epNum}</div>

          {/* Right: Bookmark Button */}
          <div className="flex justify-end">
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-colors cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-950 ${
                isBookmarked ? "text-primary" : "hover:bg-accent hover:text-accent-foreground"
              }`}
              aria-label="Bookmark this episode"
            >
              <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </header>

        {/* Content Section */}
        <article className="px-6 py-10 sm:px-12 prose prose-stone dark:prose-invert max-w-none">
          <h1 className="text-2xl font-bold mb-8 text-center">{currentEpisode.title}</h1>
          <div className="whitespace-pre-wrap leading-relaxed text-lg sm:text-xl space-y-6">
            {currentEpisode.content}
          </div>
        </article>

        {/* Publisher Info */}
        <footer className="border-t border-primary px-6 py-2">
          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-2">
                <EyeIcon />
                <span className="text-sm font-medium">{novel.views.toLocaleString()} วิว</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <HeartIcon className="text-red-500" fill="currentColor" />
                <span className="text-sm font-medium">{novel.likes.toLocaleString()} ถูกใจ</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                width={48}
                height={48}
                src={novel.publisher.logo || "/placeholder.svg?height=48&width=48"}
                alt={novel.publisher.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">เผยแพร่โดย</p>
                <Link href={novel.publisher.website} className="font-bold hover:underline">
                  {novel.publisher.name}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Bottom Navigation & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2">

        {/* Center: Nav Buttons */}
        <div className="flex items-center gap-3 order-1 sm:order-2">
          {prevEpisode ? (
            <Link
              href={getEpisodeLink(prevEpisode)}
              className="inline-flex items-center rounded-md px-3 py-2 font-medium hover:bg-muted cursor-pointer"
              onClick={() => setIsNavigate(true)}
            >
              <ChevronLeft size={18} />
              <span>ก่อนหน้า</span>
            </Link>
          ) : (
            <div className="inline-flex items-center rounded-md px-3 py-2 font-medium hover:bg-muted opacity-40 cursor-not-allowed">
              <ChevronLeft size={18} />
              <span>ก่อนหน้า</span>
            </div>
          )}
          <Link
            href={`/novel/${novel.id}`}
            className="inline-flex items-center rounded-md px-3 py-2 font-medium hover:bg-muted cursor-pointer"
            title="Back to Detail"
            onClick={() => setIsNavigate(true)}
          >
            <Home size={18} />
          </Link>
          {nextEpisode ? (
            <Link
              href={getEpisodeLink(nextEpisode)}
              className="inline-flex items-center rounded-md px-3 py-2 font-medium hover:bg-muted cursor-pointer"
              onClick={() => setIsNavigate(true)}
            >
              <span>ถัดไป</span>
              <ChevronRight size={18} />
            </Link>
          ) : (
            <div className="inline-flex items-center rounded-md px-3 py-2 font-medium hover:bg-muted opacity-40 cursor-not-allowed">
              <span>ถัดไป</span>
              <ChevronRight size={18} />
            </div>
          )}
        </div>
      </div>
      {
        isNavigate && <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          {/* backdrop */}
          <div className="absolute inset-0 bg-white/10 dark:bg-zinc-950/10 backdrop-blur-sm animate-in fade-in duration-200" />
          {/* loading */}
          <div className="relative w-32 h-32 text-card-foreground overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col items-center justify-center gap-4">
            <Loader className="animate-spin" size={64} />
            <span className="text-base lg:text-xl font-medium">กำลังโหลด</span>
          </div>
        </div>
      }
      {isListOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-white/10 dark:bg-zinc-950/10 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsListOpen(false)}
          />

          {/* Dialog Content */}
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-800 text-card-foreground border border-zinc-500 dark:border-zinc-950 rounded-md overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Dialog Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-500 dark:border-zinc-950">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <List size={20} className="text-primary" />
                สารบัญ
              </h2>
              <button
                onClick={() => setIsListOpen(false)}
                className="p-2 dark:hover:bg-zinc-700 hover:bg-zinc-300 rounded-full transition-colors cursor-pointer"
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Dialog Body */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <div className="grid gap-2">
                <Link
                    href={`/novel/${novel.id}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-md transition-all 
                      hover:bg-accent hover:text-accent-foreground hover:bg-zinc-300 dark:hover:bg-zinc-950 dark:border-zinc-950
                    `}
                    onClick={() => setIsNavigate(true)}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-black font-mono px-2 py-0.5 rounded-full bg-muted`}>
                        0
                      </span>
                      <span className="font-medium truncate max-w-60 sm:max-w-xs">ข้อมูลนิยายเรื่องนี้</span>
                    </div>
                  </Link>
                {episodes.map((ep) => (
                  <Link
                    key={ep.episode}
                    href={getEpisodeLink(ep.episode)}
                    className={`flex items-center justify-between px-4 py-3 rounded-md transition-all ${
                      ep.episode === epNum
                        ? "dark:bg-zinc-950 hover:bg-zinc-300 dark:hover:bg-zinc-900 text-primary-foreground shadow-md transform bg-zinc-200"
                        : "hover:bg-accent hover:text-accent-foreground hover:bg-zinc-300 dark:hover:bg-zinc-950 dark:border-zinc-950"
                    }`}
                    onClick={() => setIsNavigate(true)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-black font-mono px-2 py-0.5 rounded-full ${
                          ep.episode === epNum ? "bg-primary-foreground/20" : "bg-muted"
                        }`}
                      >
                        {ep.episode}
                      </span>
                      <span className="font-medium truncate max-w-60 sm:max-w-xs">{ep.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="px-6 py-4 border-t border-zinc-500 dark:border-zinc-950 bg-muted/30 flex justify-between items-center text-xs text-muted-foreground">
              <span>ทั้งหมด {episodes.length} ตอน</span>
              <span>กำลังอ่านตอนที่ {epNum}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
