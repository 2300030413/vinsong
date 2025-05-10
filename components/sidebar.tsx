"use client"

import { Home, Search, Library, PlusCircle, Heart, Download, Compass, Music2, History, Mic } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="w-60 bg-[#121212] p-4 hidden md:block overflow-y-auto border-r border-[#282828]"
    >
      <div className="mb-6">
        <motion.div variants={item} className="flex items-center space-x-2 mb-6">
          <Music2 size={28} className="text-red-500" />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-400">
            VIN Song
          </h1>
        </motion.div>

        <nav className="space-y-2">
          <Link href="/">
            <motion.div
              variants={item}
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                isActive("/") ? "bg-[#282828] text-white" : "text-gray-300 hover:text-white hover:bg-[#282828]"
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </motion.div>
          </Link>

          <Link href="/explore">
            <motion.div
              variants={item}
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                isActive("/explore") ? "bg-[#282828] text-white" : "text-gray-300 hover:text-white hover:bg-[#282828]"
              }`}
            >
              <Compass size={20} />
              <span>Explore</span>
            </motion.div>
          </Link>

          <Link href="/search">
            <motion.div
              variants={item}
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                isActive("/search") ? "bg-[#282828] text-white" : "text-gray-300 hover:text-white hover:bg-[#282828]"
              }`}
            >
              <Search size={20} />
              <span>Search</span>
            </motion.div>
          </Link>

          <Link href="/library">
            <motion.div
              variants={item}
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                isActive("/library") ? "bg-[#282828] text-white" : "text-gray-300 hover:text-white hover:bg-[#282828]"
              }`}
            >
              <Library size={20} />
              <span>Your Library</span>
            </motion.div>
          </Link>
        </nav>
      </div>

      <div className="mb-6">
        <motion.div variants={item} className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sm text-gray-400">YOUR COLLECTION</h2>
          <button className="text-gray-400 hover:text-white player-control">
            <PlusCircle size={18} />
          </button>
        </motion.div>

        <Link href="/liked">
          <motion.div
            variants={item}
            className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
              isActive("/liked") ? "bg-[#282828] text-white" : "text-gray-300 hover:text-white hover:bg-[#282828]"
            }`}
          >
            <Heart size={20} />
            <span>Liked Songs</span>
          </motion.div>
        </Link>

        <Link href="/downloads">
          <motion.div
            variants={item}
            className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
              isActive("/downloads") ? "bg-[#282828] text-white" : "text-gray-300 hover:text-white hover:bg-[#282828]"
            }`}
          >
            <Download size={20} />
            <span>Downloads</span>
          </motion.div>
        </Link>

        <Link href="/history">
          <motion.div
            variants={item}
            className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
              isActive("/history") ? "bg-[#282828] text-white" : "text-gray-300 hover:text-white hover:bg-[#282828]"
            }`}
          >
            <History size={20} />
            <span>History</span>
          </motion.div>
        </Link>

        <Link href="/podcasts">
          <motion.div
            variants={item}
            className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
              isActive("/podcasts") ? "bg-[#282828] text-white" : "text-gray-300 hover:text-white hover:bg-[#282828]"
            }`}
          >
            <Mic size={20} />
            <span>Podcasts</span>
          </motion.div>
        </Link>
      </div>

      <motion.div variants={item} className="border-t border-[#282828] pt-4">
        <h2 className="font-semibold text-sm mb-2 text-gray-400">YOUR PLAYLISTS</h2>
        <div className="space-y-1">
          {["Workout Mix", "Chill Vibes", "Party Anthems", "Focus Flow", "Road Trip", "Throwback Hits"].map(
            (playlist, index) => (
              <motion.a
                key={playlist}
                variants={item}
                custom={index}
                href="#"
                className="block text-gray-300 hover:text-white p-2 text-sm rounded-md hover:bg-[#282828] transition-colors"
              >
                {playlist}
              </motion.a>
            ),
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
