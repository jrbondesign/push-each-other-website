"use client"
import { useState, useRef, useEffect } from "react"

export interface AudioPlayerState {
  isPlaying: boolean
  isLoading: boolean
  currentTime: number
  duration: number
  error: string | null
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    error: null,
  })
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)

  const play = async (url: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      // If playing a different episode, stop current and load new
      if (currentUrl !== url) {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }

        // Create new audio element
        const audio = new Audio(url)
        audioRef.current = audio
        setCurrentUrl(url)

        // Set up event listeners
        audio.addEventListener("loadedmetadata", () => {
          setState((prev) => ({
            ...prev,
            duration: audio.duration,
            isLoading: false,
          }))
        })

        audio.addEventListener("timeupdate", () => {
          setState((prev) => ({
            ...prev,
            currentTime: audio.currentTime,
          }))
        })

        audio.addEventListener("ended", () => {
          setState((prev) => ({
            ...prev,
            isPlaying: false,
            currentTime: 0,
          }))
        })

        audio.addEventListener("error", () => {
          setState((prev) => ({
            ...prev,
            error: "Failed to load audio",
            isLoading: false,
            isPlaying: false,
          }))
        })
      }

      if (audioRef.current) {
        await audioRef.current.play()
        setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }))
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to play audio",
        isLoading: false,
        isPlaying: false,
      }))
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setState((prev) => ({ ...prev, isPlaying: false }))
    }
  }

  const toggle = (url: string) => {
    if (currentUrl === url && state.isPlaying) {
      pause()
    } else {
      play(url)
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setState((prev) => ({ ...prev, currentTime: time }))
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return {
    ...state,
    currentUrl,
    play,
    pause,
    toggle,
    seek,
  }
}
