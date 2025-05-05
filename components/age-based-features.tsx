import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'

export default function AgeBasedFeatures() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Content That Grows With You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our age-based modules adapt to your life stage, ensuring you always have the right resources at the right time.
          </p>
        </div>
        
        <Tabs defaultValue="0-15" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="0-15">0-15 Years</TabsTrigger>
            <TabsTrigger value="16-21">16-21 Years</TabsTrigger>
            <TabsTrigger value="22-45">22-45 Years</TabsTrigger>
            <TabsTrigger value="46+">46+ Years</TabsTrigger>
          </TabsList>
          
          <TabsContent value="0-15" className="mt-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Childhood & Early Education</Badge>
                <CardTitle>Building Strong Foundations</CardTitle>
                <CardDescription>Essential resources for parents and young children</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 md:grid-cols-2">
                  <FeatureItem text="Birth certificate registration guide" />
                  <FeatureItem text="Vaccination schedule reminders" />
                  <FeatureItem text="School enrollment assistance" />
                  <FeatureItem text="Child development milestones" />
                  <FeatureItem text="Educational resources for parents" />
                  <FeatureItem text="Health check-up reminders" />
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="16-21" className="mt-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Adolescence & Early Adulthood</Badge>
                <CardTitle>Navigating Important Transitions</CardTitle>
                <CardDescription>Resources for teens and young adults</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 md:grid-cols-2">
                  <FeatureItem text="Citizenship application wizard" />
                  <FeatureItem text="Voter ID registration" />
                  <FeatureItem text="Career planning resources" />
                  <FeatureItem text="Scholarship database" />
                  <FeatureItem text="Higher education guidance" />
                  <FeatureItem text="Driving license application help" />
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="22-45" className="mt-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Career & Family Life</Badge>
                <CardTitle>Building Your Future</CardTitle>
                <CardDescription>Resources for professional and personal growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 md:grid-cols-2">
                  <FeatureItem text="Marriage registration guidance" />
                  <FeatureItem text="Passport application assistant" />
                  <FeatureItem text="Property management tools" />
                  <FeatureItem text="Financial planning resources" />
                  <FeatureItem text="Job application tracking" />
                  <FeatureItem text="Family health management" />
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="46+" className="mt-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Midlife & Beyond</Badge>
                <CardTitle>Planning for Later Years</CardTitle>
                <CardDescription>Resources for planning ahead and enjoying later life</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 md:grid-cols-2">
                  <FeatureItem text="Retirement planning" />
                  <FeatureItem text="Senior citizen ID application" />
                  <FeatureItem text="Healthcare benefits guide" />
                  <FeatureItem text="Will and estate planning" />
                  <FeatureItem text="Elder care resources" />
                  <FeatureItem text="Social security benefits" />
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
      <span>{text}</span>
    </li>
  )
}