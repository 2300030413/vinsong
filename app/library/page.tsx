"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Play, Library, Plus, Search, Grid3X3, List } from "lucide-react"
import TopBar from "@/components/top-bar"
import Sidebar from "@/components/sidebar"
import MusicPlayer from "@/components/music-player"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Playlist {
  id: number
  title: string
  description: string
  coverArt: string
  songCount: number
  createdBy: string
}

export default function LibraryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("musicify-auth")
    if (!authData) {
      router.push("/login")
      return
    }

    // Simulate loading playlists
    setTimeout(() => {
      setPlaylists([
        {
          id: 1,
          title: "My Favorites",
          description: "All my favorite songs in one place",
          coverArt: "https://picsum.photos/seed/playlist1/300",
          songCount: 42,
          createdBy: "You",
        },
        {
          id: 2,
          title: "Workout Mix",
          description: "High energy songs for the gym",
          coverArt: "https://picsum.photos/seed/playlist2/300",
          songCount: 18,
          createdBy: "You",
        },
        {
          id: 3,
          title: "Chill Vibes",
          description: "Relaxing tunes for unwinding",
          coverArt: "https://picsum.photos/seed/playlist3/300",
          songCount: 25,
          createdBy: "You",
        },
        {
          id: 4,
          title: "Road Trip",
          description: "Songs for long drives",
          coverArt: "https://picsum.photos/seed/playlist4/300",
          songCount: 30,
          createdBy: "You",
        },
        {
          id: 5,
          title: "Party Anthems",
          description: "Get the party started",
          coverArt: "https://picsum.photos/seed/playlist5/300",
          songCount: 22,
          createdBy: "You",
        },
        {
          id: 6,
          title: "Focus Flow",
          description: "Concentration and productivity",
          coverArt: "https://picsum.photos/seed/playlist6/300",
          songCount: 15,
          createdBy: "You",
        },
        {
          id: 7,
          title: "Throwback Hits",
          description: "Classics from the past",
          coverArt: "https://picsum.photos/seed/playlist7/300",
          songCount: 35,
          createdBy: "You",
        },
        {
          id: 8,
          title: "New Discoveries",
          description: "Fresh finds and new artists",
          coverArt: "https://picsum.photos/seed/playlist8/300",
          songCount: 12,
          createdBy: "You",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [router])

  const filteredPlaylists = playlists.filter(
    (playlist) =>
      playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-white text-xl flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-red-500" />
          <span>Loading your library...</span>
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
                <Library size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Your Library</h1>
                <p className="text-gray-400">{playlists.length} playlists</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search your library"
                  className="pl-10 bg-[#282828] border-none focus-visible:ring-red-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-[#282828] rounded-md p-1">
                  <button
                    className={`p-1 rounded ${viewMode === "grid" ? "bg-[#3d3d3d]" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 size={20} />
                  </button>
                  <button
                    className={`p-1 rounded ${viewMode === "list" ? "bg-[#3d3d3d]" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List size={20} />
                  </button>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus size={18} className="mr-2" />
                  New Playlist
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPlaylists.map((playlist, i) => (
                  <motion.div
                    key={playlist.id}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  >
                    <div className="relative playlist-card">
                      <motion.img
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                        src={playlist.coverArt}
                        alt={playlist.title}
                        className="rounded-md w-full aspect-square object-cover shadow-lg"
                      />
                      <div className="playlist-overlay absolute inset-0 flex items-center justify-center rounded-md">
                        <button className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg">
                          <Play size={20} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-medium text-sm">{playlist.title}</h3>
                    <p className="text-xs text-gray-400">
                      {playlist.songCount} songs • {playlist.createdBy}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-[#181818] rounded-xl overflow-hidden border border-[#282828] shadow-lg">
                <table className="w-full text-sm">
                  <thead className="border-b border-[#282828] text-gray-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Title</th>
                      <th className="px-4 py-3 text-left hidden md:table-cell">Description</th>
                      <th className="px-4 py-3 text-right">Songs</th>
                      <th className="px-4 py-3 text-right hidden md:table-cell">Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlaylists.map((playlist, index) => (
                      <motion.tr
                        key={playlist.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="song-row hover:bg-[#282828] group cursor-pointer"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <img
                              src={playlist.coverArt || "/placeholder.svg"}
                              alt={playlist.title}
                              className="h-10 w-10 rounded-md mr-3 hidden sm:block album-cover"
                            />
                            <div className="font-medium">{playlist.title}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{playlist.description}</td>
                        <td className="px-4 py-3 text-gray-400 text-right">{playlist.songCount}</td>
                        <td className="px-4 py-3 text-gray-400 text-right hidden md:table-cell">
                          {playlist.createdBy}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}
