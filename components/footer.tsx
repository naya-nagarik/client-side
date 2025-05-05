import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Naya Nagarik. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/privacy" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
          <Link 
            href="/terms" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms
          </Link>
          <Link 
            href="/accessibility" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Accessibility
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-right flex items-center">
          Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> in Nepal
        </p>
      </div>
    </footer>
  )
}