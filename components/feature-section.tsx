import { ReactNode } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface FeatureSectionProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureSection({ icon, title, description }: FeatureSectionProps) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-center">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}