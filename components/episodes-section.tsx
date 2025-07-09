"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { fetchEpisodes } from "@/lib/rss-parser"
import { AudioPlayer } from "@/components/audio-player"
import Image from "next/image"

export default async function EpisodesSection() {
  const episodes = await fetchEpisodes()

  // Function to clean up text and convert HTML entities to proper quotes
  const cleanText = (text: string) => {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8216;/g, "'")
      .replace(/&#8217;/g, "'")
  }

  return (
    <section id="episodes" className="py-20 bg-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Latest Episodes</h2>
          <p className="text-lg text-gray-600">Catch up on our most recent conversations</p>
        </div>
        <div className="grid gap-6">
          {episodes.map((episode, index) => (
            <Card
              key={episode.id}
              className={`${episode.featured ? "ring-2 ring-red-800" : ""} hover:shadow-lg transition-shadow bg-white`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <Image
                      src={episode.imageUrl || "/podcast-cover.png"}
                      alt={`${cleanText(episode.title)} episode artwork`}
                      width={80}
                      height={80}
                      className="rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      {episode.featured && <Badge className="bg-red-800 hover:bg-red-900">Featured</Badge>}
                      <span className="text-sm text-gray-500">Episode {episodes.length - index}</span>
                    </div>
                    <CardTitle className="text-xl">{cleanText(episode.title)}</CardTitle>
                    <CardDescription className="text-base">{cleanText(episode.description)}</CardDescription>
                  </div>
                  <AudioPlayer
                    audioUrl={episode.audioUrl}
                    title={cleanText(episode.title)}
                    variant="ghost"
                    className="shrink-0 hover:bg-red-50"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {episode.date}
                    </span>
                  </div>
                  <AudioPlayer
                    audioUrl={episode.audioUrl}
                    title={cleanText(episode.title)}
                    variant="outline"
                    className="border-red-800 text-red-800 hover:bg-red-50"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-red-800 text-red-800 hover:bg-red-50 bg-transparent">
            View All Episodes
          </Button>
        </div>
      </div>
    </section>
  )
}
