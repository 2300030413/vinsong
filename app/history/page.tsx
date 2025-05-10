"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Play, Clock, MoreHorizontal } from "lucide-react"
import TopBar from "@/components/top-bar"
import Sidebar from "@/components/sidebar"
import MusicPlayer from "@/components/music-player"

interface HistoryItem {
  id: number
  title: string
  artist: string
  album: string
  coverArt: string
  playedAt: string
}

export default function HistoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("musicify-auth")
    if (!authData) {
      router.push("/login")
      return
    }

    // Simulate loading history
    setTimeout(() => {
      setHistory([
        {
          id: 1,
          title: "Samajavaragamana",
          artist: "Sid Sriram",
          album: "Ala Vaikunthapurramuloo",
          coverArt: "https://picsum.photos/seed/telugu1/300",
          playedAt: "Today, 10:23 AM",
        },
        {
          id: 2,
          title: "Power Up",
          artist: "Fitness Beats",
          album: "Workout Mix Vol. 1",
          coverArt: "https://picsum.photos/seed/workout1/300",
          playedAt: "Today, 9:15 AM",
        },
        {
          id: 3,
          title: "Deep Focus",
          artist: "Concentration Wave",
          album: "Study Session",
          coverArt: "https://picsum.photos/seed/focus1/300",
          playedAt: "Yesterday, 8:45 PM",
        },
        {
          id: 4,
          title: "Butta Bomma",
          artist: "Armaan Malik",
          album: "Ala Vaikunthapurramuloo",
          coverArt: "https://picsum.photos/seed/telugu2/300",
          playedAt: "Yesterday, 7:30 PM",
        },
        {
          id: 5,
          title: "Run Faster",
          artist: "Cardio Kings",
          album: "High Energy",
          coverArt: "https://picsum.photos/seed/workout2/300",
          playedAt: "Yesterday, 6:20 PM",
        },
        {
          id: 6,
          title: "Naatu Naatu",
          artist: "Rahul Sipligunj, Kaala Bhairava",
          album: "RRR",
          coverArt: "https://picsum.photos/seed/telugu3/300",
          playedAt: "2 days ago, 9:10 PM",
        },
        {
          id: 7,
          title: "Ambient Study",
          artist: "Brain Power",
          album: "Concentration",
          coverArt: "https://picsum.photos/seed/focus2/300",
          playedAt: "2 days ago, 4:45 PM",
        },
        {
          id: 8,
          title: "Lift Heavy",
          artist: "Iron Pumpers",
          album: "Gym Motivation",
          coverArt: "https://picsum.photos/seed/workout3/300",
          playedAt: "3 days ago, 11:30 AM",
        },
        {
          id: 9,
          title: "Saranga Dariya",
          artist: "Mangli",
          album: "Love Story",
          coverArt: "https://picsum.photos/seed/telugu4/300",
          playedAt: "3 days ago, 10:15 AM",
        },
        {
          id: 10,
          title: "Productivity Zone",
          artist: "Work Flow",
          album: "Get Things Done",
          coverArt: "https://picsum.photos/seed/focus3/300",
          playedAt: "4 days ago, 8:20 PM",
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
          <span>Loading history...</span>
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
                <Clock size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Recently Played</h1>
                <p className="text-gray-400">Your listening history</p>
              </div>
            </div>

            <div className="bg-[#181818] rounded-xl overflow-hidden border border-[#282828] shadow-lg">
              <table className="w-full text-sm">
                <thead className="border-b border-[#282828] text-gray-400">
                  <tr>
                    <th className="px-4 py-3 text-left w-10">#</th>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Album</th>
                    <th className="px-4 py-3 text-right">Played</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="song-row hover:bg-[#282828] group cursor-pointer"
                    >
                      <td className="px-4 py-3 text-gray-400">
                        <div className="flex items-center justify-center w-6 h-6 group-hover:hidden">{index + 1}</div>
                        <button className="hidden group-hover:flex items-center justify-center w-6 h-6 player-control">
                          <Play size={14} className="text-white" />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <img
                            src={item.coverArt || "/placeholder.svg"}
                            alt={item.title}
                            className="h-10 w-10 rounded-md mr-3 hidden sm:block album-cover"
                          />
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-gray-400 text-xs">{item.artist}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{item.album}</td>
                      <td className="px-4 py-3 text-gray-400 text-right">{item.playedAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
