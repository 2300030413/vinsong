// Mock API functions for VIN Song application

// Mock song data
const workoutSongs = [
  {
    id: 11,
    title: "Power Up",
    artist: "Fitness Beats",
    album: "Workout Mix Vol. 1",
    duration: "3:45",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    coverArt: "https://picsum.photos/seed/workout1/300",
  },
  {
    id: 12,
    title: "Run Faster",
    artist: "Cardio Kings",
    album: "High Energy",
    duration: "4:12",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    coverArt: "https://picsum.photos/seed/workout2/300",
  },
  {
    id: 13,
    title: "Lift Heavy",
    artist: "Iron Pumpers",
    album: "Gym Motivation",
    duration: "3:58",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    coverArt: "https://picsum.photos/seed/workout3/300",
  },
  {
    id: 14,
    title: "HIIT Session",
    artist: "Interval Training",
    album: "Burn Calories",
    duration: "4:30",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    coverArt: "https://picsum.photos/seed/workout4/300",
  },
  {
    id: 15,
    title: "Muscle Up",
    artist: "Gym Heroes",
    album: "Strength Training",
    duration: "3:22",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    coverArt: "https://picsum.photos/seed/workout5/300",
  },
]

const focusSongs = [
  {
    id: 21,
    title: "Deep Focus",
    artist: "Concentration Wave",
    album: "Study Session",
    duration: "5:30",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    coverArt: "https://picsum.photos/seed/focus1/300",
  },
  {
    id: 22,
    title: "Ambient Study",
    artist: "Brain Power",
    album: "Concentration",
    duration: "6:15",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
    coverArt: "https://picsum.photos/seed/focus2/300",
  },
  {
    id: 23,
    title: "Productivity Zone",
    artist: "Work Flow",
    album: "Get Things Done",
    duration: "4:45",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverArt: "https://picsum.photos/seed/focus3/300",
  },
  {
    id: 24,
    title: "Zen Mode",
    artist: "Mindfulness",
    album: "Clear Thoughts",
    duration: "7:20",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverArt: "https://picsum.photos/seed/focus4/300",
  },
  {
    id: 25,
    title: "Brain Waves",
    artist: "Alpha State",
    album: "Mental Clarity",
    duration: "5:55",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverArt: "https://picsum.photos/seed/focus5/300",
  },
]

const teluguSongs = [
  {
    id: 1,
    title: "Samajavaragamana",
    artist: "Sid Sriram",
    album: "Ala Vaikunthapurramuloo",
    duration: "4:30",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverArt: "https://picsum.photos/seed/telugu1/300",
  },
  {
    id: 2,
    title: "Butta Bomma",
    artist: "Armaan Malik",
    album: "Ala Vaikunthapurramuloo",
    duration: "3:27",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverArt: "https://picsum.photos/seed/telugu2/300",
  },
  {
    id: 3,
    title: "Naatu Naatu",
    artist: "Rahul Sipligunj, Kaala Bhairava",
    album: "RRR",
    duration: "4:35",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverArt: "https://picsum.photos/seed/telugu3/300",
  },
  {
    id: 4,
    title: "Saranga Dariya",
    artist: "Mangli",
    album: "Love Story",
    duration: "3:58",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    coverArt: "https://picsum.photos/seed/telugu4/300",
  },
  {
    id: 5,
    title: "Srivalli",
    artist: "Sid Sriram",
    album: "Pushpa",
    duration: "3:32",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverArt: "https://picsum.photos/seed/telugu5/300",
  },
  {
    id: 6,
    title: "Oo Antava",
    artist: "Indravathi Chauhan",
    album: "Pushpa",
    duration: "3:58",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    coverArt: "https://picsum.photos/seed/telugu6/300",
  },
  {
    id: 7,
    title: "Adiga Adiga",
    artist: "Sid Sriram",
    album: "Ninnu Kori",
    duration: "4:35",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    coverArt: "https://picsum.photos/seed/telugu7/300",
  },
  {
    id: 8,
    title: "Inkem Inkem",
    artist: "Sid Sriram",
    album: "Geetha Govindam",
    duration: "4:29",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    coverArt: "https://picsum.photos/seed/telugu8/300",
  },
  {
    id: 9,
    title: "Ramulo Ramula",
    artist: "Anurag Kulkarni",
    album: "Ala Vaikunthapurramuloo",
    duration: "3:42",
    liked: true,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    coverArt: "https://picsum.photos/seed/telugu9/300",
  },
  {
    id: 10,
    title: "Buttabomma",
    artist: "Armaan Malik",
    album: "Ala Vaikunthapurramuloo",
    duration: "3:27",
    liked: false,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    coverArt: "https://picsum.photos/seed/telugu10/300",
  },
]

// Authentication
export async function loginUser(email: string, password: string) {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          email: email || "user@vinsongs.com",
          name: email ? email.split("@")[0] : "VIN User",
        },
        token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
      })
    }, 1000)
  })
}

export async function registerUser(name: string, email: string, password: string) {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "User registered successfully",
        user: {
          name: name || "VIN User",
          email: email || "user@vinsongs.com",
        },
        token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
      })
    }, 1000)
  })
}

export function getCurrentUser() {
  if (typeof window !== "undefined") {
    const authData = localStorage.getItem("musicify-auth")
    if (authData) {
      return JSON.parse(authData).user
    }
  }
  return null
}

export function isAuthenticated() {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("musicify-auth")
  }
  return false
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("musicify-auth")
  }
}

// Song related API calls
export async function fetchTeluguSongs() {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teluguSongs)
    }, 500)
  })
}

export async function fetchWorkoutSongs() {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(workoutSongs)
    }, 500)
  })
}

export async function fetchFocusSongs() {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(focusSongs)
    }, 500)
  })
}

export async function fetchLikedSongs() {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      // Combine all songs and filter for liked ones
      const allSongs = [...teluguSongs, ...workoutSongs, ...focusSongs]
      const likedSongs = allSongs.filter((song) => song.liked)
      resolve(likedSongs)
    }, 500)
  })
}

export async function toggleSongLike(id: number) {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the song in any of the arrays
      let found = false

      // Check in Telugu songs
      const teluguIndex = teluguSongs.findIndex((song) => song.id === id)
      if (teluguIndex !== -1) {
        teluguSongs[teluguIndex].liked = !teluguSongs[teluguIndex].liked
        found = true
        resolve({ liked: teluguSongs[teluguIndex].liked })
      }

      // Check in workout songs
      if (!found) {
        const workoutIndex = workoutSongs.findIndex((song) => song.id === id)
        if (workoutIndex !== -1) {
          workoutSongs[workoutIndex].liked = !workoutSongs[workoutIndex].liked
          found = true
          resolve({ liked: workoutSongs[workoutIndex].liked })
        }
      }

      // Check in focus songs
      if (!found) {
        const focusIndex = focusSongs.findIndex((song) => song.id === id)
        if (focusIndex !== -1) {
          focusSongs[focusIndex].liked = !focusSongs[focusIndex].liked
          resolve({ liked: focusSongs[focusIndex].liked })
        }
      }

      // If not found in any array
      if (!found) {
        resolve({ liked: false })
      }
    }, 300)
  })
}

export async function searchSongs(query: string) {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      // Combine all songs
      const allSongs = [...teluguSongs, ...workoutSongs, ...focusSongs]

      // Filter songs based on query
      const filteredSongs = allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase()) ||
          song.album.toLowerCase().includes(query.toLowerCase()),
      )

      resolve(filteredSongs)
    }, 500)
  })
}

export async function fetchRecommendedSongs() {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      // Combine all songs and get a random selection
      const allSongs = [...teluguSongs, ...workoutSongs, ...focusSongs]
      const shuffled = [...allSongs].sort(() => 0.5 - Math.random())
      const recommended = shuffled.slice(0, 6)
      resolve(recommended)
    }, 500)
  })
}

export async function fetchDownloadedSongs() {
  // Simulate API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get a random selection of songs as "downloaded"
      const allSongs = [...teluguSongs, ...workoutSongs, ...focusSongs]
      const shuffled = [...allSongs].sort(() => 0.5 - Math.random())
      const downloaded = shuffled.slice(0, 8)
      resolve(downloaded)
    }, 500)
  })
}
