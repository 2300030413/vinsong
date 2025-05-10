"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import MusicPlayer from "@/components/music-player"
import Sidebar from "@/components/sidebar"
import TopBar from "@/components/top-bar"
import MusicLibrary from "@/components/music-library"
import { motion } from "framer-motion"
import { Loader2, Play, Headphones, Clock, Flame, Sparkles } from "lucide-react"
import { fetchRecommendedSongs } from "@/lib/api"

interface Song {
  id: number
  title: string
  artist: string
  album: string
  coverArt: string
  audioSrc: string
  duration: string
  liked: boolean
}

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([])

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("musicify-auth")

    if (!authData) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)

      // Fetch recommended songs
      fetchRecommendedSongs().then((songs) => {
        setRecommendedSongs(songs as Song[])
      })
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-white text-xl flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-red-500" />
          <span>Loading your music...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="h-screen flex flex-col bg-[#121212] text-white">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 page-transition">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-6 text-white">
              Welcome to <span className="text-red-500">VIN Song</span>
            </h1>

            {/* Featured Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="category-card relative overflow-hidden rounded-xl h-40 workout-gradient"
                onClick={() => router.push("/workout")}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold">Workout</h2>
                    <Headphones className="text-white/80" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 mb-2">Energize your workout</p>
                    <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
                      <Play size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="category-card relative overflow-hidden rounded-xl h-40 focus-gradient"
                onClick={() => router.push("/focus")}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold">Focus</h2>
                    <Clock className="text-white/80" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 mb-2">Music for concentration</p>
                    <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
                      <Play size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="category-card relative overflow-hidden rounded-xl h-40 party-gradient"
                onClick={() => router.push("/party")}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold">Party</h2>
                    <Flame className="text-white/80" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 mb-2">Get the party started</p>
                    <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
                      <Play size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="category-card relative overflow-hidden rounded-xl h-40 liked-gradient"
                onClick={() => router.push("/liked")}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold">Liked</h2>
                    <Sparkles className="text-white/80" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 mb-2">Your favorite tracks</p>
                    <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
                      <Play size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Recommended for You</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {recommendedSongs.slice(0, 6).map((song, i) => (
                  <motion.div
                    key={song.id}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  >
                    <div className="relative playlist-card">
                      <motion.img
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                        src={song.coverArt}
                        alt={song.title}
                        className="rounded-md w-full aspect-square object-cover shadow-lg"
                      />
                      <div className="playlist-overlay absolute inset-0 flex items-center justify-center rounded-md">
                        <button className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg">
                          <Play size={20} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-medium text-sm">{song.title}</h3>
                    <p className="text-xs text-gray-400">{song.artist}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <MusicLibrary />
          </motion.div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}
