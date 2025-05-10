"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Play, Download, MoreHorizontal, Pause, Heart } from "lucide-react"
import TopBar from "@/components/top-bar"
import Sidebar from "@/components/sidebar"
import MusicPlayer from "@/components/music-player"
import { fetchDownloadedSongs } from "@/lib/api"

interface Song {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  liked: boolean
  audioSrc: string
  coverArt: string
}

export default function DownloadsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [downloadedSongs, setDownloadedSongs] = useState<Song[]>([])
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("musicify-auth")
    if (!authData) {
      router.push("/login")
      return
    }

    // Fetch downloaded songs
    fetchDownloadedSongs().then((songs) => {
      setDownloadedSongs(songs as Song[])
      setIsLoading(false)
    })
  }, [router])

  const togglePlay = (songId: number) => {
    if (currentlyPlaying === songId) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentlyPlaying(songId)
      setIsPlaying(true)

      // Find the song
      const song = downloadedSongs.find((s) => s.id === songId)
      if (song) {
        // Dispatch custom event for the music player to update
        const event = new CustomEvent("songchange", {
          detail: { song },
        })
        window.dispatchEvent(event)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-white text-xl flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-red-500" />
          <span>Loading downloads...</span>
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
                <Download size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Downloads</h1>
                <p className="text-gray-400">{downloadedSongs.length} songs available offline</p>
              </div>
            </div>

            <div className="bg-[#181818] rounded-xl overflow-hidden border border-[#282828] shadow-lg">
              <table className="w-full text-sm">
                <thead className="border-b border-[#282828] text-gray-400">
                  <tr>
                    <th className="px-4 py-3 text-left w-10">#</th>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Album</th>
                    <th className="px-4 py-3 text-right">Duration</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {downloadedSongs.map((song, index) => (
                    <motion.tr
                      key={song.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`song-row hover:bg-[#282828] group cursor-pointer ${
                        currentlyPlaying === song.id ? "bg-[#282828]" : ""
                      }`}
                      onClick={() => togglePlay(song.id)}
                    >
                      <td className="px-4 py-3 text-gray-400">
                        <div className="flex items-center justify-center w-6 h-6 group-hover:hidden">
                          {currentlyPlaying === song.id && isPlaying ? (
                            <div className="equalizer">
                              <div className="bar"></div>
                              <div className="bar"></div>
                              <div className="bar"></div>
                              <div className="bar"></div>
                            </div>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <button
                          onClick={() => togglePlay(song.id)}
                          className="hidden group-hover:flex items-center justify-center w-6 h-6 player-control"
                        >
                          {currentlyPlaying === song.id && isPlaying ? (
                            <Pause size={14} className="text-white" />
                          ) : (
                            <Play size={14} className="text-white" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <img
                            src={song.coverArt || "/placeholder.svg"}
                            alt={song.album}
                            className="h-10 w-10 rounded-md mr-3 hidden sm:block album-cover"
                          />
                          <div>
                            <div className={`font-medium ${currentlyPlaying === song.id ? "text-red-500" : ""}`}>
                              {song.title}
                            </div>
                            <div className="text-gray-400 text-xs">{song.artist}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{song.album}</td>
                      <td className="px-4 py-3 text-gray-400 text-right">{song.duration}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className={song.liked ? "text-red-500" : "text-gray-400 hover:text-white"}>
                            <Heart size={16} fill={song.liked ? "currentColor" : "none"} className="player-control" />
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <MoreHorizontal size={16} className="player-control" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}
