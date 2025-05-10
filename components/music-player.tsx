"use client"

import { useState, useRef, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Heart,
  ListMusic,
  VolumeX,
  Maximize2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeated, setIsRepeated] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(70)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Current song info (would be managed by global state in a real app)
  const [currentSong, setCurrentSong] = useState({
    title: "Samajavaragamana",
    artist: "Sid Sriram",
    album: "Ala Vaikunthapurramuloo",
    cover: "https://picsum.photos/seed/telugu1/300",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  })

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(currentSong.audioSrc)

    const audio = audioRef.current

    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    // Set initial volume
    audio.volume = volume / 100

    // Listen for song change events from the library component
    window.addEventListener("songchange", handleSongChange)

    // Clean up on unmount
    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      window.removeEventListener("songchange", handleSongChange)
    }
  }, [currentSong])

  // Handle song change event from library
  const handleSongChange = (event: Event) => {
    const customEvent = event as CustomEvent
    const song = customEvent.detail.song

    setCurrentSong({
      title: song.title,
      artist: song.artist,
      album: song.album,
      cover: song.coverArt,
      audioSrc: song.audioSrc,
    })

    setIsPlaying(true)
    setIsLiked(song.liked)
  }

  // Update progress bar as song plays
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Update duration when song loads
  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Handle song end
  const handleEnded = () => {
    if (isRepeated && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      setIsPlaying(false)
      setCurrentTime(0)
      // In a real app, you might auto-play the next song here
    }
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Seek to position in song
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = previousVolume / 100
        setVolume(previousVolume)
      } else {
        setPreviousVolume(volume)
        audioRef.current.volume = 0
        setVolume(0)
      }
      setIsMuted(!isMuted)
    }
  }

  // Adjust volume
  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100
      setVolume(value[0])
      if (value[0] === 0) {
        setIsMuted(true)
      } else if (isMuted) {
        setIsMuted(false)
      }
    }
  }

  // Format time display (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-t border-[#282828] bg-[#181818] p-3"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 w-1/4">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSong.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              src={currentSong.cover}
              alt={currentSong.title}
              className="h-14 w-14 rounded-md shadow-lg album-cover"
            />
          </AnimatePresence>
          <div>
            <AnimatePresence mode="wait">
              <motion.h4
                key={currentSong.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-medium text-sm"
              >
                {currentSong.title}
              </motion.h4>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSong.artist}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-xs text-gray-400"
              >
                {currentSong.artist}
              </motion.p>
            </AnimatePresence>
          </div>
          <button
            className={`player-control ${isLiked ? "text-red-500" : "text-gray-400 hover:text-white"}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center space-x-4 mb-2">
            <button
              className={`player-control ${isShuffled ? "text-red-400" : "text-gray-400 hover:text-white"}`}
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <Shuffle size={18} />
            </button>
            <button className="text-gray-400 hover:text-white player-control">
              <SkipBack size={20} />
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="bg-white text-black rounded-full p-1 hover:bg-gray-200 shadow-lg player-control"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            <button className="text-gray-400 hover:text-white player-control">
              <SkipForward size={20} />
            </button>
            <button
              className={`player-control ${isRepeated ? "text-red-400" : "text-gray-400 hover:text-white"}`}
              onClick={() => setIsRepeated(!isRepeated)}
            >
              <Repeat size={18} />
            </button>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
            />
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-1/4 justify-end">
          <button className="text-gray-400 hover:text-white player-control">
            <ListMusic size={18} />
          </button>
          <div className="flex items-center space-x-2 w-32">
            <button onClick={toggleMute} className="player-control">
              {isMuted || volume === 0 ? (
                <VolumeX size={18} className="text-gray-400" />
              ) : (
                <Volume2 size={18} className="text-gray-400" />
              )}
            </button>
            <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-full" />
          </div>
          <button className="text-gray-400 hover:text-white player-control ml-2">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
