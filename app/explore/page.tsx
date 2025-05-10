"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Play, Headphones, Radio, Mic2, Flame, Music2 } from "lucide-react"
import TopBar from "@/components/top-bar"
import Sidebar from "@/components/sidebar"
import MusicPlayer from "@/components/music-player"

interface Category {
  id: number
  title: string
  description: string
  image: string
  icon: React.ReactNode
  color: string
}

export default function ExplorePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("musicify-auth")
    if (!authData) {
      router.push("/login")
      return
    }

    // Simulate loading categories
    setTimeout(() => {
      setCategories([
        {
          id: 1,
          title: "New Releases",
          description: "Fresh music just for you",
          image: "https://picsum.photos/seed/new/500/300",
          icon: <Music2 size={24} />,
          color: "from-red-500 to-orange-500",
        },
        {
          id: 2,
          title: "Telugu Hits",
          description: "Top Telugu songs",
          image: "https://picsum.photos/seed/telugu/500/300",
          icon: <Mic2 size={24} />,
          color: "from-purple-500 to-pink-500",
        },
        {
          id: 3,
          title: "Workout Mix",
          description: "Energize your workout",
          image: "https://picsum.photos/seed/workout/500/300",
          icon: <Headphones size={24} />,
          color: "from-blue-500 to-cyan-500",
        },
        {
          id: 4,
          title: "Focus Flow",
          description: "Music for concentration",
          image: "https://picsum.photos/seed/focus/500/300",
          icon: <Radio size={24} />,
          color: "from-green-500 to-emerald-500",
        },
        {
          id: 5,
          title: "Party Anthems",
          description: "Get the party started",
          image: "https://picsum.photos/seed/party/500/300",
          icon: <Flame size={24} />,
          color: "from-yellow-500 to-amber-500",
        },
        {
          id: 6,
          title: "Chill Vibes",
          description: "Relax and unwind",
          image: "https://picsum.photos/seed/chill/500/300",
          icon: <Radio size={24} />,
          color: "from-indigo-500 to-violet-500",
        },
        {
          id: 7,
          title: "90s Nostalgia",
          description: "Throwback classics",
          image: "https://picsum.photos/seed/90s/500/300",
          icon: <Music2 size={24} />,
          color: "from-pink-500 to-rose-500",
        },
        {
          id: 8,
          title: "Indie Discoveries",
          description: "Undiscovered gems",
          image: "https://picsum.photos/seed/indie/500/300",
          icon: <Headphones size={24} />,
          color: "from-teal-500 to-cyan-500",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [router])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-white text-xl flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-red-500" />
          <span>Loading categories...</span>
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
            <h1 className="text-3xl font-bold mb-6 text-white">
              Explore <span className="text-red-500">Categories</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="category-card relative overflow-hidden rounded-xl h-48 cursor-pointer"
                  onClick={() => router.push(`/category/${category.id}`)}
                >
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div
                      className={`bg-gradient-to-r ${category.color} w-10 h-10 rounded-full flex items-center justify-center`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{category.title}</h2>
                      <p className="text-sm text-white/80 mb-2">{category.description}</p>
                      <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
                        <Play size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">Trending Now</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <div className="relative playlist-card">
                    <motion.img
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.2 }}
                      src={`https://picsum.photos/seed/trend${i}/300`}
                      alt={`Trending ${i + 1}`}
                      className="rounded-md w-full aspect-square object-cover shadow-lg"
                    />
                    <div className="playlist-overlay absolute inset-0 flex items-center justify-center rounded-md">
                      <button className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg">
                        <Play size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm">Trending Hit {i + 1}</h3>
                  <p className="text-xs text-gray-400">Various Artists</p>
                </motion.div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "Pop",
                "Rock",
                "Hip Hop",
                "Electronic",
                "Classical",
                "Jazz",
                "R&B",
                "Country",
                "Folk",
                "Indie",
                "Metal",
                "Blues",
              ].map((genre, i) => (
                <motion.div
                  key={genre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="bg-[#181818] hover:bg-[#282828] rounded-lg p-4 text-center transition-colors cursor-pointer"
                >
                  {genre}
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
