export interface Episode {
  id: string
  title: string
  description: string
  duration: string
  date: string
  audioUrl: string
  imageUrl?: string
  featured?: boolean
}

export async function fetchEpisodes(): Promise<Episode[]> {
  try {
    const response = await fetch("/api/rss", {
      cache: "no-store",
    })

    console.log("[v0] RSS fetch response status:", response.status)
    console.log("[v0] RSS fetch response ok:", response.ok)

    if (!response.ok) {
      console.error("[v0] RSS fetch failed with status:", response.status)
      throw new Error(`Failed to fetch RSS feed: ${response.status}`)
    }

    const xmlText = await response.text()
    console.log("[v0] RSS Feed fetched successfully, length:", xmlText.length)

    // Use regex parsing instead of DOMParser for server compatibility
    const episodes: Episode[] = []

    // Extract items using regex
    const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/g) || []
    console.log("[v0] Found", itemMatches.length, "episodes in RSS feed")

    itemMatches.forEach((itemXml, index) => {
      // Extract title
      const titleMatch = itemXml.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/)
      const rawTitle = (titleMatch?.[1] || titleMatch?.[2] || "Untitled Episode").trim()
      // Clean up HTML entities in title
      const title = rawTitle
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

      // Extract description
      const descMatch = itemXml.match(
        /<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/,
      )
      const rawDescription = (descMatch?.[1] || descMatch?.[2] || "").replace(/<[^>]*>/g, "").trim()
      const description = rawDescription
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

      // Extract pub date
      const pubDateMatch = itemXml.match(/<pubDate[^>]*>(.*?)<\/pubDate>/)
      const pubDate = pubDateMatch?.[1] || ""

      // Extract duration
      const durationMatch = itemXml.match(/<itunes:duration[^>]*>(.*?)<\/itunes:duration>/)
      const duration = durationMatch?.[1] || "0:00"

      // Extract audio URL
      const enclosureMatch = itemXml.match(/<enclosure[^>]*url="([^"]*)"/)
      const audioUrl = enclosureMatch?.[1] || ""

      // Extract episode image
      const imageMatch =
        itemXml.match(/<itunes:image[^>]*href="([^"]*)"/) || itemXml.match(/<image[^>]*><url[^>]*>([^<]*)<\/url>/)
      const imageUrl = imageMatch?.[1] || "/podcast-cover.png"

      // Extract GUID
      const guidMatch = itemXml.match(/<guid[^>]*>(.*?)<\/guid>/)
      const guid = guidMatch?.[1] || `episode-${index}`

      // Format date
      const formattedDate = pubDate
        ? new Date(pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Unknown Date"

      episodes.push({
        id: guid,
        title: title,
        description: description.substring(0, 200) + (description.length > 200 ? "..." : ""),
        duration: duration,
        date: formattedDate,
        audioUrl: audioUrl,
        imageUrl: imageUrl,
        featured: index === 0,
      })

      console.log(`[v0] Episode ${index + 1}: ${title}`)
    })

    console.log("[v0] Total episodes processed:", episodes.length)
    return episodes
  } catch (error) {
    console.error("[v0] Error fetching RSS feed:", error)
    if (error instanceof Error) {
      console.error("[v0] Error message:", error.message)
      console.error("[v0] Error stack:", error.stack)
    }
    // Return fallback episodes if RSS fetch fails
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
