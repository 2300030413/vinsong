"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Play, Mic } from "lucide-react"
import TopBar from "@/components/top-bar"
import Sidebar from "@/components/sidebar"
import MusicPlayer from "@/components/music-player"

interface Podcast {
  id: number
  title: string
  host: string
  description: string
  coverArt: string
  episodes: number
  category: string
}

export default function PodcastsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [featuredPodcast, setFeaturedPodcast] = useState<Podcast | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("musicify-auth")
    if (!authData) {
      router.push("/login")
      return
    }

    // Simulate loading podcasts
    setTimeout(() => {
      const podcastsList = [
        {
          id: 1,
          title: "Tech Talk Today",
          host: "Alex Johnson",
          description: "Daily discussions about the latest in technology and digital trends.",
          coverArt: "https://picsum.photos/seed/podcast1/300",
          episodes: 156,
          category: "Technology",
        },
        {
          id: 2,
          title: "Mindful Moments",
          host: "Sarah Williams",
          description: "Guided meditation and mindfulness practices for everyday life.",
          coverArt: "https://picsum.photos/seed/podcast2/300",
          episodes: 89,
          category: "Health & Wellness",
        },
        {
          id: 3,
          title: "Business Breakdown",
          host: "Michael Chen",
          description: "Analyzing successful business strategies and entrepreneurial insights.",
          coverArt: "https://picsum.photos/seed/podcast3/300",
          episodes: 112,
          category: "Business",
        },
        {
          id: 4,
          title: "True Crime Stories",
          host: "Emily Rodriguez",
          description: "Investigating mysterious cases and unsolved crimes from around the world.",
          coverArt: "https://picsum.photos/seed/podcast4/300",
          episodes: 78,
          category: "True Crime",
        },
        {
          id: 5,
          title: "Science Simplified",
          host: "Dr. James Wilson",
          description: "Making complex scientific concepts accessible to everyone.",
          coverArt: "https://picsum.photos/seed/podcast5/300",
          episodes: 64,
          category: "Science",
        },
        {
          id: 6,
          title: "History Uncovered",
          host: "Priya Patel",
          description: "Exploring forgotten historical events and their impact on today's world.",
          coverArt: "https://picsum.photos/seed/podcast6/300",
          episodes: 95,
          category: "History",
        },
        {
          id: 7,
          title: "Film Fanatics",
          host: "David Kim & Lisa Park",
          description: "Reviews and discussions about classic and contemporary cinema.",
          coverArt: "https://picsum.photos/seed/podcast7/300",
          episodes: 203,
          category: "Entertainment",
        },
        {
          id: 8,
          title: "Cooking Chronicles",
          host: "Chef Maria Gonzalez",
          description: "Recipes, cooking tips, and food culture from around the globe.",
          coverArt: "https://picsum.photos/seed/podcast8/300",
          episodes: 127,
          category: "Food",
        },
      ]

      setPodcasts(podcastsList)
      setFeaturedPodcast(podcastsList[0])
      setIsLoading(false)
    }, 1000)
  }, [router])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-white text-xl flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-red-500" />
          <span>Loading podcasts...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#121212] text-white">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 page-transition">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 shadow-lg">
                <Mic size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Podcasts</h1>
                <p className="text-gray-400">Discover shows you'll love</p>
              </div>
            </div>

            {featuredPodcast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 bg-gradient-to-r from-[#282828] to-[#181818] rounded-xl overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <img
                    src={featuredPodcast.coverArt || "/placeholder.svg"}
                    alt={featuredPodcast.title}
                    className="w-full md:w-64 h-64 object-cover"
                  />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-semibold text-red-500 mb-2">FEATURED PODCAST</div>
                      <h2 className="text-2xl font-bold mb-2">{featuredPodcast.title}</h2>
                      <p className="text-gray-400 mb-4">{featuredPodcast.description}</p>
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <span className="mr-4">Host: {featuredPodcast.host}</span>
                        <span>{featuredPodcast.episodes} episodes</span>
                      </div>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white rounded-full py-2 px-6 inline-flex items-center transition-colors w-fit">
                      <Play size={16} className="mr-2" />
                      Listen Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <h2 className="text-2xl font-bold mb-4 text-white">Popular Podcasts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
              {podcasts.slice(0, 4).map((podcast, i) => (
                <motion.div
                  key={podcast.id}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <div className="relative playlist-card">
                    <motion.img
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.2 }}
                      src={podcast.coverArt}
                      alt={podcast.title}
                      className="rounded-md w-full aspect-square object-cover shadow-lg"
                    />
                    <div className="playlist-overlay absolute inset-0 flex items-center justify-center rounded-md">
                      <button className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg">
                        <Play size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm">{podcast.title}</h3>
                  <p className="text-xs text-gray-400">{podcast.host}</p>
                </motion.div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {[
                "Technology",
                "Health & Wellness",
                "Business",
                "True Crime",
                "Science",
                "History",
                "Entertainment",
                "Food",
                "Sports",
                "News",
                "Comedy",
                "Education",
              ].map((category, i) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="bg-[#181818] hover:bg-[#282828] rounded-lg p-4 text-center transition-colors cursor-pointer"
                >
                  {category}
                </motion.div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">All Podcasts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {podcasts.map((podcast, i) => (
                <motion.div
                  key={podcast.id}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <div className="relative playlist-card">
                    <motion.img
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.2 }}
                      src={podcast.coverArt}
                      alt={podcast.title}
                      className="rounded-md w-full aspect-square object-cover shadow-lg"
                    />
                    <div className="playlist-overlay absolute inset-0 flex items-center justify-center rounded-md">
                      <button className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg">
                        <Play size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm">{podcast.title}</h3>
                  <p className="text-xs text-gray-400">
                    {podcast.host} • {podcast.category}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}
