import { fetchEpisodes } from "@/lib/rss-parser"
import PodcastWebsiteClient from "@/components/podcast-website-client"

export default async function PodcastWebsite() {
  console.log("[v0] Fetching episodes from RSS feed...")
  const episodes = await fetchEpisodes()
  console.log("[v0] Episodes fetched:", episodes.length)

  const firstEpisode = episodes[0]

  const platforms = [
    {
      name: "Apple Podcasts",
      icon: "/apple-podcasts-logo.svg",
      url: "https://podcasts.apple.com/us/podcast/push-each-other-to-the-top/id1818173130",
    },
    {
      name: "Spotify",
      icon: "spotify",
      url: "https://open.spotify.com/show/7tU63YzOtjBxLgYvFDhw79?si=6d3b75aca0ee41d3",
    },
    {
      name: "YouTube",
      icon: "youtube",
      url: "https://www.youtube.com/@PushEachOthertotheTop",
    },
    {
      name: "RSS Feed",
      icon: "rss",
      url: "https://feeds.buzzsprout.com/2499350.rss",
    },
  ]

  return <PodcastWebsiteClient episodes={episodes} firstEpisode={firstEpisode} platforms={platforms} />
}
