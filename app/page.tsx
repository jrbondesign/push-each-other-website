"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, Podcast, Users, Star, Calendar, Clock, ExternalLink, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import EpisodesSection from "@/components/episodes-section"
import { fetchEpisodes } from "@/lib/rss-parser"

export default async function PodcastWebsite() {
  const episodes = await fetchEpisodes()
  const firstEpisode = episodes[0]

  const platforms = [
    {
      name: "Apple Podcasts",
      icon: "🎵",
      url: "https://podcasts.apple.com/us/podcast/push-each-other-to-the-top/id1818173130",
    },
    {
      name: "Spotify",
      icon: "🎧",
      url: "https://open.spotify.com/show/7tU63YzOtjBxLgYvFDhw79?si=6d3b75aca0ee41d3",
    },
    {
      name: "YouTube",
      icon: "📺",
      url: "https://www.youtube.com/@PushEachOthertotheTop",
    },
    {
      name: "RSS Feed",
      icon: "📡",
      url: "https://feeds.buzzsprout.com/2499350.rss",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Podcast className="h-8 w-8 text-red-800" />
              <span className="text-xl font-bold text-gray-900">Push Each Other to the Top</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="#episodes" className="text-gray-600 hover:text-gray-900 transition-colors">
                Episodes
              </Link>
              <Link href="#listen-everywhere" className="text-gray-600 hover:text-gray-900 transition-colors">
                Subscribe
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="w-fit bg-red-100 text-red-800 hover:bg-red-200">
                    <Star className="w-4 h-4 mr-1" />
                    Hope & Healing
                  </Badge>
                  <Badge variant="secondary" className="w-fit bg-purple-100 text-purple-800 hover:bg-purple-200">
                    <Heart className="w-4 h-4 mr-1" />
                    Mental Health
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Push Each Other to the <span className="text-red-800">Top</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  A podcast about recovery, resilience, and the power of honest conversation. Raw, real stories full of
                  hope for anyone looking to move forward from the mess.
                </p>
                <p className="text-lg text-gray-500">
                  Hosted by <span className="font-medium">Jonathan & Brent</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-red-800 hover:bg-red-900 text-white"
                  onClick={() => firstEpisode?.audioUrl && window.open(firstEpisode.audioUrl, "_blank")}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Listening
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Weekly Episodes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>30-60 min</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-red-800 to-red-900 rounded-3xl shadow-2xl flex items-center justify-center p-4 max-w-sm mx-auto">
                <Image
                  src="/podcast-cover.png"
                  alt="Push Each Other to the Top Podcast Cover"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-left space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">About the Show</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Push Each Other to the Top is a podcast about recovery, resilience, and the power of honest conversation.
              In each episode, Brent shares his journey through addiction, healing, faith, and the long road back — not
              as an expert, but as someone who's been there. Host Jonathan listens, asks, and reflects as they explore
              what it means to fall, and what it takes to climb again.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              These aren't polished success stories — they're raw, real, and full of hope. If you're looking for a
              podcast that meets you in the mess and helps you move forward, you're in the right place.
            </p>

            {/* Hosts Section */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-6 rounded-xl text-left">
                <div className="w-20 h-20 bg-red-100 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-800">J</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Jonathan</h3>
                <p className="text-gray-600">
                  Host who listens, asks, and reflects as they explore what it means to fall, and what it takes to climb
                  again.
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl text-left">
                <div className="w-20 h-20 bg-red-100 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-800">B</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Brent</h3>
                <p className="text-gray-600">
                  Shares his journey through addiction, healing, faith, and the long road back — not as an expert, but
                  as someone who's been there.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-left space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold">Honest Conversation</h3>
                <p className="text-gray-600">Real talk about real struggles, without the polish or pretense</p>
              </div>
              <div className="text-left space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold">Hope & Healing</h3>
                <p className="text-gray-600">Finding light in dark places and strength for the journey forward</p>
              </div>
              <div className="text-left space-y-4">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold">Mental Health</h3>
                <p className="text-gray-600">Supporting recovery and wellness through authentic stories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Section - Now using RSS data */}
      <EpisodesSection />

      {/* Subscribe Section */}
      <section id="listen-everywhere" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Listen Everywhere</h2>
            <p className="text-lg text-gray-600">Subscribe on your favorite platform</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {platforms.map((platform) => (
              <Link key={platform.name} href={platform.url} className="group" target="_blank" rel="noopener noreferrer">
                <div className="text-center p-6 hover:shadow-lg transition-all group-hover:scale-105 hover:bg-red-50 border rounded-lg">
                  <div className="space-y-3">
                    <div className="text-3xl">{platform.icon}</div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm">{platform.name}</h3>
                      <ExternalLink className="w-4 h-4 mx-auto text-gray-400 group-hover:text-red-600" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Podcast className="h-6 w-6 text-red-400" />
                <span className="text-lg font-bold text-white">Push Each Other to the Top</span>
              </div>
              <p className="text-gray-400">
                A podcast about recovery, resilience, and the power of honest conversation.
              </p>
              <p className="text-gray-400">Hosted by Jonathan & Brent</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <div className="space-y-2">
                <Link href="#about" className="block text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="#episodes" className="block text-gray-400 hover:text-white transition-colors">
                  Episodes
                </Link>
                <Link href="#listen-everywhere" className="block text-gray-400 hover:text-white transition-colors">
                  Subscribe
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Listen & Connect</h3>
              <div className="space-y-2">
                <Link
                  href="https://podcasts.apple.com/us/podcast/push-each-other-to-the-top/id1818173130"
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple Podcasts
                </Link>
                <Link
                  href="https://open.spotify.com/show/7tU63YzOtjBxLgYvFDhw79?si=6d3b75aca0ee41d3"
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify
                </Link>
                <Link
                  href="https://www.youtube.com/@PushEachOthertotheTop"
                  className="block text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </Link>
                <Link
                  href="mailto:hello@pushtothetopp.com"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Email
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Push Each Other to the Top. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
