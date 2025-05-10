"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell, ChevronDown, LogOut, Settings, User, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export default function TopBar() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Get user data from localStorage
    const authData = localStorage.getItem("musicify-auth")
    if (authData) {
      const { user } = JSON.parse(authData)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("musicify-auth")
    router.push("/login")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-16 border-b border-[#282828] bg-[#121212] flex items-center justify-between px-4 md:px-6"
    >
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex space-x-2">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => router.forward()}
            className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="md:hidden">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-400">
            VIN Song
          </h1>
        </div>

        <form onSubmit={handleSearch} className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search songs, artists, or albums"
              className="pl-10 bg-[#282828] border-none focus-visible:ring-red-500 w-64 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          className="hidden md:flex border-red-500/30 text-white hover:bg-red-500/10 hover:text-white transition-all"
        >
          Upgrade to Premium
        </Button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-white player-control"
        >
          <Bell size={20} />
        </motion.button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 cursor-pointer">
              <Avatar className="h-8 w-8 ring-2 ring-red-500/30">
                <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-400">
                  {user?.name?.charAt(0) || "V"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">{user?.name || "VIN User"}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#282828] border-[#3d3d3d]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#3d3d3d]" />
            <DropdownMenuItem className="hover:bg-[#3d3d3d] cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#3d3d3d] cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#3d3d3d]" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}
