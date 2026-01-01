"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { User, ChevronRight, X } from "lucide-react"
import { ThemeToggleButton } from "./themeButton"
import { usePathname } from "next/navigation"

const genres = [
  "All",
  "Action",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi"
] //Mock genres

export const Navbar = ({withSubmenu = false}: {withSubmenu?: boolean}) => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeGenre, setActiveGenre] = useState("All")

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isDrawerOpen])

  return (
    <>
      <nav className="fixed top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex flex-row gap-6">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                <div className="h-6 w-6 rounded bg-foreground" />
                <span>Novel</span>
              </Link>
              <div className="flex flex-row gap-2">
                <button
                  className={`relative flex h-10.5 items-center whitespace-nowrap text-sm transition-colors ${
                    pathname === "/"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  นิยายทั้งหมด
                  {pathname === "/" && (
                    <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-foreground" />
                  )}
                </button>
                <button
                  className={`relative flex h-10.5 items-center whitespace-nowrap text-sm transition-colors ${
                    pathname === "/"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  รายการที่คั่นไว้
                  {pathname === "/bookmarks" && (
                    <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-foreground" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden items-center gap-2 md:flex">
                <span className="text-xs font-medium text-muted-foreground">my username</span>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <User size={16} />
                </div>
              </div>

              <ThemeToggleButton />

              <button className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary">
                <User size={18} />
              </button>
            </div>
          </div>
        </div>

        {withSubmenu && (
          <div className="hidden border-t border-border md:block">
            <div className="mx-auto max-w-7xl px-4">
              <div className="flex items-center gap-6 h-11 overflow-x-auto no-scrollbar">
                {genres.map((genre) => (
                  <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`relative flex h-10.5 items-center whitespace-nowrap text-sm transition-colors ${
                    activeGenre === genre
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {genre}
                  {activeGenre === genre && (
                    <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        )}
        <div className="border-t border-border md:hidden">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm"
          >
            <span className="font-medium">Filter by Genre: {activeGenre}</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>
      </nav>

      <div className="h-25.25 md:h-25.25" />

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="relative w-full rounded-t-2xl border-t border-border bg-card p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-muted" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Select Genre</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="rounded-full p-1 hover:bg-secondary">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-8">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    setActiveGenre(genre)
                    setIsDrawerOpen(false)
                  }}
                  className={`flex h-12 items-center justify-center rounded-lg border transition-all ${
                    activeGenre === genre
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-border bg-secondary/50 text-muted-foreground hover:border-muted"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
