export type NovelPublisher = {
  id: string
  name: string
  logo: string
  website: string
}

export type NovelStatus = 'ongoing' | 'completed'

export type Novel = {
  id: string
  title: string
  description: string
  genre: string

  publisher: NovelPublisher

  cover: string
  is_new: boolean
  total_episodes: number
  views: number
  likes: number
  status: NovelStatus

  created_at: string
  updated_at: string
}
