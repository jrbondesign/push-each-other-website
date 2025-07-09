"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, Podcast, Users, Star, Calendar, Clock, ExternalLink, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import EpisodesSection from "@/components/episodes-section"
import { SimplePlayButton } from "@/components/simple-play-button"
import { AudioPlayerWidget } from "@/components/audio-player-widget"
import { useAudioPlayerContext } from "@/hooks/use-audio-player-context"
import { fetchEpisodes } from "@/lib/rss-parser"

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

  return <PodcastWebsiteContent episodes={episodes} firstEpisode={firstEpisode} platforms={platforms} />
}

function PodcastWebsiteContent({ episodes, firstEpisode, platforms }: any) {
  const { currentEpisode, isPlayerOpen, isMinimized, closePlayer, toggleMinimize } = useAudioPlayerContext()

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Podcast className="h-8 w-8 text-red-800" />
              <span className="text-xl font-bold text-gray-900">Push Each Other to the Top Podcast</span>
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
                {firstEpisode?.audioUrl ? (
                  <SimplePlayButton
                    episode={{
                      id: firstEpisode.id,
                      title: firstEpisode.title,
                      audioUrl: firstEpisode.audioUrl,
                      imageUrl: firstEpisode.imageUrl,
                      duration: firstEpisode.duration,
                    }}
                    size="lg"
                    variant="default"
                    className="bg-red-800 hover:bg-red-900 text-white"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Listening
                  </SimplePlayButton>
                ) : (
                  <Button
                    size="lg"
                    className="bg-red-800 hover:bg-red-900 text-white"
                    onClick={() =>
                      window.open(
                        "https://podcasts.apple.com/us/podcast/push-each-other-to-the-top/id1818173130",
                        "_blank",
                      )
                    }
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Listening
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                {platforms.map((platform: any) => (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <div
                      className={`${
                        platform.name === "Spotify"
                          ? "text-green-500"
                          : platform.name === "YouTube"
                            ? "text-red-600"
                            : "text-gray-500"
                      } group-hover:scale-110 transition-transform`}
                    >
                      {platform.name === "Apple Podcasts" ? (
                        <Image
                          src="/apple-podcasts-logo.svg"
                          alt="Apple Podcasts"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      ) : platform.name === "Spotify" ? (
                        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      ) : platform.name === "YouTube" ? (
                        <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs">
                      {platform.name === "Apple Podcasts"
                        ? "Apple"
                        : platform.name === "RSS Feed"
                          ? "RSS"
                          : platform.name}
                    </span>
                  </Link>
                ))}
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
            {/* Host Cards - moved here */}
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Meet Your Hosts</h2>
              <p className="text-lg text-gray-600">The voices behind the conversations</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div className="bg-gray-50 p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-19 h-19 mb-6 overflow-hidden rounded-full mx-auto">
                  <Image
                    src="/jonathan-photo.png"
                    alt="Jonathan - Podcast Host"
                    width={75}
                    height={75}
                    className="w-full h-full object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Jonathan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Host who listens, asks, and reflects as they explore what it means to fall, and what it takes to climb
                  again.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-19 h-19 mb-6 overflow-hidden rounded-full mx-auto">
                  <Image
                    src="/brent-photo.png"
                    alt="Brent - Podcast Host"
                    width={75}
                    height={75}
                    className="w-full h-full object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Brent</h3>
                <p className="text-gray-600 leading-relaxed">
                  Shares his journey through addiction, healing, faith, and the long road back — not as an expert, but
                  as someone who's been there.
                </p>
              </div>
            </div>

            {/* About the Show content starts here */}
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
      <EpisodesSection episodes={episodes} />

      {/* Subscribe Section */}
      <section id="listen-everywhere" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Listen Everywhere</h2>
            <p className="text-lg text-gray-600">Subscribe on your favorite platform</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {platforms.map((platform: any) => (
              <Link key={platform.name} href={platform.url} className="group" target="_blank" rel="noopener noreferrer">
                <div className="text-center p-6 hover:shadow-lg transition-all group-hover:scale-105 hover:bg-red-50 border rounded-lg">
                  <div className="space-y-3">
                    <div
                      className={`${
                        platform.name === "Spotify"
                          ? "text-green-500"
                          : platform.name === "YouTube"
                            ? "text-red-600"
                            : "text-gray-600 group-hover:text-red-600"
                      } transition-colors flex justify-center`}
                    >
                      {platform.icon}
                    </div>
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
                <span className="text-lg font-bold text-white">Push Each Other to the Top Podcast</span>
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

      {/* Audio Player Widget */}
      {isPlayerOpen && (
        <AudioPlayerWidget
          episode={currentEpisode}
          onClose={closePlayer}
          isMinimized={isMinimized}
          onToggleMinimize={toggleMinimize}
        />
      )}
    </div>
  )
}
