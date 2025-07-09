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
    const response = await fetch("https://feeds.buzzsprout.com/2499350.rss", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch RSS feed")
    }

    const xmlText = await response.text()

    // Use regex parsing instead of DOMParser for server compatibility
    const episodes: Episode[] = []

    // Extract items using regex
    const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/g) || []

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
        featured: index === 0, // Mark first episode as featured
      })
    })

    return episodes // Return ALL episodes instead of limiting to 4
  } catch (error) {
    console.error("Error fetching RSS feed:", error)
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
