"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Music2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      // Auto-register without validation
      const mockUser = {
        name: name || "VIN User",
        email: email || "user@vinsongs.com",
      }

      // Store auth data in localStorage
      localStorage.setItem(
        "musicify-auth",
        JSON.stringify({
          user: mockUser,
          token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
        }),
      )

      // Move to success step
      setStep(2)

      // Auto redirect after 2 seconds
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Music2 size={40} className="text-red-500 animate-pulse-scale" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">VIN Song</h1>
          <p className="text-gray-400">Create your account to start listening</p>
        </div>

        <div className="bg-[#181818] rounded-xl p-8 shadow-lg border border-[#282828] animate-slide-up">
          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#282828] border-[#3d3d3d] focus:border-red-500 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#282828] border-[#3d3d3d] focus:border-red-500 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#282828] border-[#3d3d3d] focus:border-red-500 text-white pr-10 placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white player-control"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-[#282828] border-[#3d3d3d] focus:border-red-500 text-white pr-10 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-red-500 hover:text-red-400 underline transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 size={60} className="mx-auto text-green-500 animate-pulse-scale" />
              <h2 className="text-2xl font-bold text-white">Registration Successful!</h2>
              <p className="text-gray-300">Your account has been created successfully.</p>
              <p className="text-gray-400 text-sm">Redirecting to home page...</p>
              <Button
                onClick={() => router.push("/")}
                className="mt-4 bg-red-600 hover:bg-red-700 transition-all duration-300"
              >
                Go to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
