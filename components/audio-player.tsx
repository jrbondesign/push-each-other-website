"use client"
import { Button } from "@/components/ui/button"
import { Play, Pause, Loader2 } from "lucide-react"
import { useAudioPlayer } from "@/hooks/use-audio-player"

interface AudioPlayerProps {
  audioUrl: string
  title: string
  size?: "sm" | "lg"
  variant?: "default" | "ghost" | "outline"
  className?: string
}

export function AudioPlayer({ audioUrl, title, size = "sm", variant = "ghost", className = "" }: AudioPlayerProps) {
  const { isPlaying, isLoading, currentUrl, toggle, error } = useAudioPlayer()

  const isCurrentTrack = currentUrl === audioUrl
  const showPlaying = isCurrentTrack && isPlaying
  const showLoading = isCurrentTrack && isLoading

  const handleClick = () => {
    if (!audioUrl) {
      // Fallback to opening in new tab if no audio URL
      window.open(audioUrl, "_blank")
      return
    }
    toggle(audioUrl)
  }

  if (error && isCurrentTrack) {
    return (
      <Button
        size={size}
        variant="outline"
        className={`text-red-600 border-red-600 ${className}`}
        onClick={() => window.open(audioUrl, "_blank")}
        title="Audio failed to load - click to open in new tab"
      >
        <Play className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={`${showPlaying ? "bg-red-50 text-red-800" : ""} ${className}`}
      onClick={handleClick}
      disabled={showLoading}
      title={showPlaying ? `Pause ${title}` : `Play ${title}`}
    >
      {showLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : showPlaying ? (
        <Pause className="w-4 h-4" />
      ) : (
        <Play className="w-4 h-4" />
      )}
    </Button>
  )
}
