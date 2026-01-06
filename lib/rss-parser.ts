export interface Episode {
  id: string
  title: string
  description: string
  duration: string
  date: string
  audioUrl: string
  imageUrl?: string
  featured?: boolean
  episodeNumber?: number
}

export async function fetchEpisodes(): Promise<Episode[]> {
  try {
    console.log("[v0] Fetching RSS feed from Buzzsprout...")

    const rssUrl = encodeURIComponent("https://feeds.buzzsprout.com/2499350.rss")
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`, {
      // @ts-ignore - next option for caching
      next: { revalidate: 3600 },
    })

    console.log("[v0] RSS fetch status:", response.status)

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] RSS feed fetched, items:", data.items?.length)

    if (!data.items || data.items.length === 0) {
      throw new Error("No episodes found in RSS feed")
    }

    const episodes: Episode[] = data.items.map((item: any, index: number) => {
      // Clean up HTML entities
      const cleanText = (text: string) => {
        return text
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&#39;/g, "'")
          .replace(/&#8220;/g, '"')
          .replace(/&#8221;/g, '"')
          .replace(/&#8216;/g, "'")
          .replace(/&#8217;/g, "'")
          .replace(/&#8211;/g, "–")
          .replace(/&#8212;/g, "—")
      }

      // Extract description and remove HTML tags
      const description = item.description ? item.description.replace(/<[^>]*>/g, "").trim() : ""

      // Format date
      const formattedDate = item.pubDate
        ? new Date(item.pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Unknown Date"

      const episodeMatch = item.title?.match(/E(\d+)/)
      const episodeNumber = episodeMatch ? Number.parseInt(episodeMatch[1], 10) : undefined

      let duration = "0:00"
      if (item.enclosure?.duration) {
        // If duration is in seconds, convert to MM:SS format
        const durationNum = Number.parseInt(item.enclosure.duration, 10)
        if (!Number.isNaN(durationNum)) {
          const minutes = Math.floor(durationNum / 60)
          const seconds = durationNum % 60
          duration = `${minutes}:${seconds.toString().padStart(2, "0")}`
        } else {
          duration = item.enclosure.duration
        }
      } else if (item["itunes:duration"]) {
        duration = item["itunes:duration"]
      }

      return {
        id: item.guid || `episode-${index}`,
        title: cleanText(item.title || "Untitled Episode"),
        description: cleanText(description.substring(0, 200) + (description.length > 200 ? "..." : "")),
        duration: duration,
        date: formattedDate,
        audioUrl: item.enclosure?.link || "",
        imageUrl: item.thumbnail || data.feed?.image || "/podcast-cover.png",
        featured: index === 0,
        episodeNumber,
      }
    })

    console.log("[v0] Successfully parsed episodes:", episodes.length)
    return episodes
  } catch (error) {
    console.error("[v0] Error fetching RSS feed:", error)
    return [
      {
        id: "fallback-1",
        title: "Latest Episode",
        description: "Check out our latest episode on your favorite podcast platform.",
        duration: "45:00",
        date: "Recent",
        audioUrl: "",
        imageUrl: "/podcast-cover.png",
        featured: true,
      },
    ]
  }
}
