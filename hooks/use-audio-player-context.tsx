"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Episode {
  id: string
  title: string
  audioUrl: string
  imageUrl?: string
  duration: string
}

interface AudioPlayerContextType {
  currentEpisode: Episode | null
  isPlayerOpen: boolean
  isMinimized: boolean
  playEpisode: (episode: Episode) => void
  closePlayer: () => void
  toggleMinimize: () => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode)
    setIsPlayerOpen(true)
    setIsMinimized(false)
  }

  const closePlayer = () => {
    setCurrentEpisode(null)
    setIsPlayerOpen(false)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        currentEpisode,
        isPlayerOpen,
        isMinimized,
        playEpisode,
        closePlayer,
        toggleMinimize,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error("useAudioPlayerContext must be used within an AudioPlayerProvider")
  }
  return context
}
