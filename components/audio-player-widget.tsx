"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, Minimize2, Maximize2, X } from "lucide-react"
import Image from "next/image"

interface AudioPlayerWidgetProps {
  episode: {
    id: string
    title: string
    audioUrl: string
    imageUrl?: string
    duration: string
  } | null
  onClose: () => void
  isMinimized: boolean
  onToggleMinimize: () => void
}

export function AudioPlayerWidget({ episode, onClose, isMinimized, onToggleMinimize }: AudioPlayerWidgetProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Initialize audio when episode changes
  useEffect(() => {
    if (!episode?.audioUrl) return

    setIsLoading(true)
    setError(null)

    // Create new audio element
    const audio = new Audio()
    audioRef.current = audio

    // Set up event listeners
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      setError("Failed to load audio. This episode may not be available for direct playback.")
      setIsLoading(false)
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("canplay", handleCanPlay)

    // Set audio source
    audio.src = episode.audioUrl
    audio.volume = volume
    audio.muted = isMuted

    // Cleanup function
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.pause()
      audio.src = ""
    }
  }, [episode?.audioUrl])

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current || !episode) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        await audioRef.current.play()
        setIsPlaying(true)
        setIsLoading(false)
      }
    } catch (err) {
      setError("Unable to play audio. Try opening the episode in your podcast app instead.")
      setIsLoading(false)
      setIsPlaying(false)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100)
    setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const openInPodcastApp = () => {
    if (episode?.audioUrl) {
      window.open(episode.audioUrl, "_blank")
    }
  }

  if (!episode) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 shadow-lg z-50 bg-white border-red-200">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <Image
                src={episode.imageUrl || "/podcast-cover.png"}
                alt={episode.title}
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{episode.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Button size="sm" variant="ghost" onClick={togglePlay} disabled={isLoading} className="h-6 w-6 p-0">
                  {isLoading ? (
                    <div className="w-3 h-3 border border-gray-300 border-t-red-600 rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </Button>
                <span className="text-xs text-gray-500">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={onToggleMinimize} className="h-6 w-6 p-0">
                <Maximize2 className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onClose} className="h-6 w-6 p-0">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          {duration > 0 && (
            <div className="mt-2">
              <Slider value={[progress]} onValueChange={handleSeek} max={100} step={0.1} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 shadow-xl z-50 bg-white border-red-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-lg">Now Playing</h3>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={onToggleMinimize} className="h-8 w-8 p-0">
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="shrink-0">
            <Image
              src={episode.imageUrl || "/podcast-cover.png"}
              alt={episode.title}
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-base leading-tight mb-2">{episode.title}</h4>
            <p className="text-sm text-gray-600">Push Each Other to the Top</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 mb-2">{error}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={openInPodcastApp}
              className="text-red-700 border-red-300 hover:bg-red-50 bg-transparent"
            >
              Open in Podcast App
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {/* Progress Bar */}
          {duration > 0 && (
            <div className="space-y-2">
              <Slider value={[progress]} onValueChange={handleSeek} max={100} step={0.1} className="w-full" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={togglePlay}
                disabled={isLoading}
                className="bg-red-800 hover:bg-red-900 text-white h-12 w-12 rounded-full p-0"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={toggleMute} className="h-8 w-8 p-0">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
          </div>

          {!error && (
            <Button
              variant="outline"
              size="sm"
              onClick={openInPodcastApp}
              className="w-full text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              Open in Podcast App
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
