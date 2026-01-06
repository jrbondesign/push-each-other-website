import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Buzzsprout feeds sometimes redirect - try with proper redirect handling
    const response = await fetch("https://feeds.buzzsprout.com/2499350.rss", {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "*/*",
      },
      redirect: "follow",
      // @ts-ignore - next option for caching
      next: { revalidate: 3600 },
    })

    console.log("[v0] RSS API route - response status:", response.status)
    console.log("[v0] RSS API route - final URL:", response.url)

    // If still getting 301, try to get the Location header
    if (response.status === 301 || response.status === 302) {
      const redirectUrl = response.headers.get("Location")
      console.log("[v0] RSS API route - redirect location:", redirectUrl)

      if (redirectUrl) {
        // Follow the redirect manually
        const redirectResponse = await fetch(redirectUrl, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "*/*",
          },
        })

        console.log("[v0] RSS API route - redirect response status:", redirectResponse.status)

        if (redirectResponse.ok) {
          const xmlText = await redirectResponse.text()
          console.log("[v0] RSS API route - fetched via redirect, length:", xmlText.length)

          return new NextResponse(xmlText, {
            headers: {
              "Content-Type": "application/xml",
              "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
            },
          })
        }
      }
    }

    if (!response.ok) {
      console.error("[v0] RSS API route failed with status:", response.status)
      return NextResponse.json({ error: `Failed to fetch RSS feed: ${response.status}` }, { status: response.status })
    }

    const xmlText = await response.text()
    console.log("[v0] RSS API route - fetched successfully, length:", xmlText.length)

    return new NextResponse(xmlText, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    console.error("[v0] RSS API route error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
