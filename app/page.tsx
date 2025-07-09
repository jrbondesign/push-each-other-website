"use client"
import Image from "next/image"
import { fetchEpisodes } from "@/lib/rss-parser"
import PodcastWebsiteClient from "@/components/podcast-website-client"

export default async function PodcastWebsite() {
  const episodes = await fetchEpisodes()
  const firstEpisode = episodes[0]

  const platforms = [
    {
      name: "Apple Podcasts",
      icon: <Image src="/apple-podcasts-logo.svg" alt="Apple Podcasts" width={32} height={32} className="w-8 h-8" />,
      url: "https://podcasts.apple.com/us/podcast/push-each-other-to-the-top/id1818173130",
    },
    {
      name: "Spotify",
      icon: (
        <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
      url: "https://open.spotify.com/show/7tU63YzOtjBxLgYvFDhw79?si=6d3b75aca0ee41d3",
    },
    {
      name: "YouTube",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      url: "https://www.youtube.com/@PushEachOthertotheTop",
    },
    {
      name: "RSS Feed",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
        </svg>
      ),
      url: "https://feeds.buzzsprout.com/2499350.rss",
    },
  ]

  return <PodcastWebsiteClient episodes={episodes} firstEpisode={firstEpisode} platforms={platforms} />
}
