import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"
import { Podcast, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact Us - Push Each Other to the Top Podcast",
  description: "Get in touch with the hosts of Push Each Other to the Top podcast. We'd love to hear from you!",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Podcast className="h-8 w-8 text-red-800" />
              <span className="text-xl font-bold text-gray-900">Push Each Other to the Top Podcast</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-red-800" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Contact Us</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We'd love to hear from you! Whether you have questions, feedback, or just want to share your story, feel
                free to reach out.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
