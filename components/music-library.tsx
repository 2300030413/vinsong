"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Heart, MoreHorizontal, Clock3 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchTeluguSongs, toggleSongLike } from "@/lib/api"

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

export default function MusicLibrary() {
  const [teluguSongs, setTeluguSongs] = useState<Song[]>([])
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentSongData, setCurrentSongData] = useState<Song | null>(null)

  // Fetch songs from backend
  useEffect(() => {
    const loadSongs = async () => {
      setIsLoading(true)
      try {
        const songs = await fetchTeluguSongs()
        if (songs && Array.isArray(songs)) {
          setTeluguSongs(songs)
        }
      } catch (error) {
        console.error("Failed to load songs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSongs()
  }, [])

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Handle play/pause
  const togglePlay = (songId: number) => {
    const song = teluguSongs.find((s) => s.id === songId)
    if (!song) return

    if (currentlyPlaying === songId) {
      // Toggle play/pause for current song
      if (isPlaying) {
        audioRef.current?.pause()
      } else {
        audioRef.current?.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      // Play a new song
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = song.audioSrc
        audioRef.current
          .play()
          .then(() => {
            setCurrentlyPlaying(songId)
            setCurrentSongData(song)
            setIsPlaying(true)

            // Dispatch custom event for the music player to update
            const event = new CustomEvent("songchange", {
              detail: { song },
            })
            window.dispatchEvent(event)
          })
          .catch((error) => {
            console.error("Error playing audio:", error)
          })
      }
    }
  }

  // Handle like/unlike
  const handleToggleLike = async (songId: number, e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      await toggleSongLike(songId)

      // Update local state
      setTeluguSongs((prev) => prev.map((song) => (song.id === songId ? { ...song, liked: !song.liked } : song)))
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  // Handle audio ended event
  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false)

      // Auto play next song
      if (currentlyPlaying) {
        const currentIndex = teluguSongs.findIndex((song) => song.id === currentlyPlaying)
        if (currentIndex < teluguSongs.length - 1) {
          const nextSong = teluguSongs[currentIndex + 1]
          togglePlay(nextSong.id)
        }
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded)
      }
    }
  }, [currentlyPlaying, teluguSongs])

  if (isLoading) {
    return (
      <div className="animate-fade-in text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-gray-400">Loading songs...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Popular Songs</h2>
        <button className="text-sm text-red-500 hover:text-red-400 transition-colors">See All</button>
      </div>

      <div className="bg-[#181818] rounded-xl overflow-hidden border border-[#282828] shadow-lg">
        <table className="w-full text-sm">
          <thead className="border-b border-[#282828] text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left w-10">#</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Album</th>
              <th className="px-4 py-3 text-right">
                <Clock3 size={16} />
              </th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {teluguSongs.map((song, index) => (
                <motion.tr
                  key={song.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`song-row hover:bg-[#282828] group ${currentlyPlaying === song.id ? "bg-[#282828]" : ""}`}
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
                      <button
                        onClick={(e) => handleToggleLike(song.id, e)}
                        className={song.liked ? "text-red-500" : "text-gray-400 hover:text-white"}
                      >
                        <Heart size={16} fill={song.liked ? "currentColor" : "none"} className="player-control" />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <MoreHorizontal size={16} className="player-control" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
