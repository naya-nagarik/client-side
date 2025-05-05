import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    quote: "Naya Nagarik helped me navigate the complex process of getting my citizenship documents. The step-by-step guide saved me so much time!",
    name: "Aarav Sharma",
    title: "Student, 18",
    avatar: "AS"
  },
  {
    quote: "As a new parent, I was overwhelmed with all the documentation needed for my child. This app simplified everything with timely reminders.",
    name: "Priya Tamang",
    title: "New Parent, 29",
    avatar: "PT"
  },
  {
    quote: "The retirement planning tools helped me understand my options and prepare for the future. Every Nepali senior should use this!",
    name: "Krishna Bahadur",
    title: "Retired Teacher, 62",
    avatar: "KB"
  }
]

export default function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Nepalis of All Ages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from citizens who have simplified their lives with Naya Nagarik.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background border-none shadow-sm">
              <CardContent className="pt-6">
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 pt-6">
                <Avatar>
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}