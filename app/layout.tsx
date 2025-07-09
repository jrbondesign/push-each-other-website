import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { AudioPlayerProvider } from "@/hooks/use-audio-player-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Push Each Other to the Top Podcast",
  description:
    "A podcast about recovery, resilience, and the power of honest conversation. Raw, real stories full of hope for anyone looking to move forward from the mess.",
  keywords: ["podcast", "recovery", "mental health", "hope", "healing", "addiction", "faith", "resilience"],
  authors: [{ name: "Jonathan & Brent" }],
  openGraph: {
    title: "Push Each Other to the Top Podcast",
    description: "A podcast about recovery, resilience, and the power of honest conversation.",
    type: "website",
    images: ["/podcast-cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Push Each Other to the Top Podcast",
    description: "A podcast about recovery, resilience, and the power of honest conversation.",
    images: ["/podcast-cover.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AudioPlayerProvider>
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </AudioPlayerProvider>
      </body>
    </html>
  )
}
