export interface Episode {
  id: string
  title: string
  description: string
  duration: string
  date: string
  audioUrl: string
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
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, "text/xml")

    const items = xmlDoc.querySelectorAll("item")
    const episodes: Episode[] = []

    items.forEach((item, index) => {
      const title = item.querySelector("title")?.textContent || "Untitled Episode"
      const description = item.querySelector("description")?.textContent || ""
      const pubDate = item.querySelector("pubDate")?.textContent || ""
      const duration = item.querySelector("itunes\\:duration, duration")?.textContent || "0:00"
      const enclosure = item.querySelector("enclosure")
      const audioUrl = enclosure?.getAttribute("url") || ""
      const guid = item.querySelector("guid")?.textContent || `episode-${index}`

      // Clean up description (remove HTML tags)
      const cleanDescription = description.replace(/<[^>]*>/g, "").trim()

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
        title: title.trim(),
        description: cleanDescription.substring(0, 200) + (cleanDescription.length > 200 ? "..." : ""),
        duration: duration,
        date: formattedDate,
        audioUrl: audioUrl,
        featured: index === 0, // Mark first episode as featured
      })
    })

    return episodes.slice(0, 4) // Return latest 4 episodes
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
        featured: true,
      },
    ]
  }
}
