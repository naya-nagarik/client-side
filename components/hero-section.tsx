import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
            Your Lifelong Nepali Companion
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Navigate Life in Nepal with
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600 ml-2">
              Confidence
            </span>
          </h1>
          
          <p className="max-w-2xl text-xl text-muted-foreground mb-8">
            From birth certificates to retirement planning, Naya Nagarik guides you through every important milestone with personalized, age-based assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="px-8">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard" className="flex items-center">
                View Demo <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">15+</span>
              <span className="text-sm text-muted-foreground">Document Wizards</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">7</span>
              <span className="text-sm text-muted-foreground">Age Categories</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">50k+</span>
              <span className="text-sm text-muted-foreground">Nepali Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">24/7</span>
              <span className="text-sm text-muted-foreground">Digital Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}