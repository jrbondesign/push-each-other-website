"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useAudioPlayerContext } from "@/hooks/use-audio-player-context"

interface SimplePlayButtonProps {
  episode: {
    id: string
    title: string
    audioUrl: string
    imageUrl?: string
    duration: string
  }
  size?: "sm" | "lg"
  variant?: "default" | "ghost" | "outline"
  className?: string
  children?: React.ReactNode
}

export function SimplePlayButton({
  episode,
  size = "sm",
  variant = "ghost",
  className = "",
  children,
}: SimplePlayButtonProps) {
  const { playEpisode } = useAudioPlayerContext()

  const handleClick = () => {
    playEpisode(episode)
  }

  return (
    <Button size={size} variant={variant} className={className} onClick={handleClick}>
      {children || <Play className="w-4 h-4" />}
    </Button>
  )
}
