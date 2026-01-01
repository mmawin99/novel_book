export type BookmarkEpisode = {
  episode: number
  title: string
  published_at: string
}

export type Bookmark = {
  novel_id: string
  novel_title: string
  novel_cover: string

  current_episode: BookmarkEpisode
  progress?: number
  updated_at: string
}
