import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Check, 
  ChevronRight, 
  Calendar, 
  FileText, 
  BookOpen, 
  Target, 
  Map 
} from 'lucide-react'
import HeroSection from '@/components/hero-section'
import FeatureSection from '@/components/feature-section'
import AgeBasedFeatures from '@/components/age-based-features'
import TestimonialSection from '@/components/testimonial-section'

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      {/* Key Features */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Your Lifelong Companion
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureSection 
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Age-Based Guidance"
              description="Content tailored to your life stage, from birth certificates to retirement planning."
            />
            <FeatureSection 
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Document Wizard"
              description="Step-by-step guides for citizenship, voter ID, and other essential documents."
            />
            <FeatureSection 
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Resource Library"
              description="Curated articles and videos to help you navigate life's important moments."
            />
            <FeatureSection 
              icon={<Target className="h-10 w-10 text-primary" />}
              title="Habit Tracker"
              description="Build positive habits with goals and achievement badges."
            />
            <FeatureSection 
              icon={<Map className="h-10 w-10 text-primary" />}
              title="Local Services"
              description="Find nearby government offices, healthcare facilities, and educational institutions."
            />
            <FeatureSection 
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Smart Reminders"
              description="Never miss important deadlines for document renewals and appointments."
            />
          </div>
        </div>
      </section>
      
      {/* Age-Based Features */}
      <AgeBasedFeatures />
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Journey Today
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/80">
            Join thousands of Nepali citizens who are simplifying their lives with Naya Nagarik.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
              <Link href="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}