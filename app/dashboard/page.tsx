"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Calendar,
  FileText,
  BookOpen,
  Target,
  Map,
  Bell,
  BarChart,
  CheckCircle2,
  AlertCircle,
  Clock,
  User
} from 'lucide-react'
import Link from 'next/link'
import ProfileSection from '@/components/dashboard/profile-section'
import DocumentsSection from '@/components/dashboard/documents-section'
import RemindersSection from '@/components/dashboard/reminders-section'
import { useToast } from '@/hooks/use-toast'

export default function DashboardPage() {
  const { toast } = useToast()
  const [age, setAge] = useState<number>(25) // Default age for demo purposes
  const [ageGroup, setAgeGroup] = useState<string>('adult')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false)
      
      // Show welcome toast
      toast({
        title: "Welcome back!",
        description: "Your dashboard has been updated with new recommendations.",
      })
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [toast])
  
  useEffect(() => {
    // Set age group based on age
    if (age < 16) {
      setAgeGroup('child')
    } else if (age < 22) {
      setAgeGroup('youth')
    } else if (age < 46) {
      setAgeGroup('adult')
    } else {
      setAgeGroup('senior')
    }
  }, [age])
  
  const renderAgeBasedRecommendations = () => {
    switch (ageGroup) {
      case 'child':
        return (
          <>
            <RecommendationCard
              icon={<Calendar className="h-5 w-5" />}
              title="Vaccination Check"
              description="Ensure all age-appropriate vaccinations are up to date"
              priority="high"
            />
            <RecommendationCard
              icon={<BookOpen className="h-5 w-5" />}
              title="School Enrollment"
              description="Guide for school admission process and requirements"
              priority="medium"
            />
            <RecommendationCard
              icon={<FileText className="h-5 w-5" />}
              title="Birth Certificate"
              description="Process for obtaining official birth documentation"
              priority="high"
            />
          </>
        )
      case 'youth':
        return (
          <>
            <RecommendationCard
              icon={<FileText className="h-5 w-5" />}
              title="Citizenship Application"
              description="Complete guide to obtaining your citizenship certificate"
              priority="high"
            />
            <RecommendationCard
              icon={<Target className="h-5 w-5" />}
              title="Career Assessment"
              description="Discover potential career paths based on your interests"
              priority="medium"
            />
            <RecommendationCard
              icon={<BookOpen className="h-5 w-5" />}
              title="College Applications"
              description="Timeline and requirements for higher education"
              priority="medium"
            />
          </>
        )
      case 'adult':
        return (
          <>
            <RecommendationCard
              icon={<FileText className="h-5 w-5" />}
              title="Passport Application"
              description="Step-by-step process for getting your passport"
              priority="medium"
            />
            <RecommendationCard
              icon={<Map className="h-5 w-5" />}
              title="Property Registration"
              description="Guide to registering property and land documents"
              priority="medium"
            />
            <RecommendationCard
              icon={<BarChart className="h-5 w-5" />}
              title="Financial Planning"
              description="Start planning for long-term financial security"
              priority="high"
            />
          </>
        )
      case 'senior':
        return (
          <>
            <RecommendationCard
              icon={<FileText className="h-5 w-5" />}
              title="Senior Citizen ID"
              description="Process for obtaining senior citizen benefits"
              priority="high"
            />
            <RecommendationCard
              icon={<BarChart className="h-5 w-5" />}
              title="Retirement Benefits"
              description="Guide to accessing government retirement benefits"
              priority="high"
            />
            <RecommendationCard
              icon={<Map className="h-5 w-5" />}
              title="Healthcare Services"
              description="Nearby healthcare facilities for senior citizens"
              priority="medium"
            />
          </>
        )
      default:
        return null
    }
  }
  
  if (isLoading) {
    return (
      <div className="container py-12 grid place-items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-muted-foreground">Loading your personalized dashboard...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-6 md:py-12">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button asChild variant="outline">
            <Link href="/profile/edit">
              <User className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </Link>
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Progress Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Your Life Journey</CardTitle>
                <CardDescription>
                  Track your progress through important life milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Childhood</span>
                      <span className="text-muted-foreground">0-15 years</span>
                    </div>
                    <Progress value={age >= 15 ? 100 : (age / 15) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Youth</span>
                      <span className="text-muted-foreground">16-21 years</span>
                    </div>
                    <Progress 
                      value={
                        age >= 21 ? 100 : 
                        age < 16 ? 0 : 
                        ((age - 16) / 5) * 100
                      } 
                      className="h-2" 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Adulthood</span>
                      <span className="text-muted-foreground">22-45 years</span>
                    </div>
                    <Progress 
                      value={
                        age >= 45 ? 100 : 
                        age < 22 ? 0 : 
                        ((age - 22) / 23) * 100
                      } 
                      className="h-2" 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Senior Years</span>
                      <span className="text-muted-foreground">46+ years</span>
                    </div>
                    <Progress 
                      value={
                        age < 46 ? 0 : 
                        ((age - 46) / 34) * 100 // Assuming up to 80 years
                      } 
                      className="h-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recommendations Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {renderAgeBasedRecommendations()}
            </div>
            
            {/* Micro Apps Section */}
            <div>
              <h2 id="micro-apps" className="text-xl font-semibold mb-4">Micro Apps</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <MicroAppCard 
                  icon={<FileText className="h-8 w-8" />}
                  title="Document Wizard"
                  href="/apps/documents"
                />
                <MicroAppCard 
                  icon={<Calendar className="h-8 w-8" />}
                  title="Scheduler"
                  href="/apps/scheduler"
                />
                <MicroAppCard 
                  icon={<BookOpen className="h-8 w-8" />}
                  title="Resource Library"
                  href="/apps/resources"
                />
                <MicroAppCard 
                  icon={<Target className="h-8 w-8" />}
                  title="Habit Tracker"
                  href="/apps/habits"
                />
                <MicroAppCard 
                  icon={<Map className="h-8 w-8" />}
                  title="Local Services"
                  href="/apps/services"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <DocumentsSection ageGroup={ageGroup} />
          </TabsContent>
          
          <TabsContent value="reminders" className="space-y-6">
            <RemindersSection ageGroup={ageGroup} />
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
            <ProfileSection 
              age={age} 
              setAge={setAge}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface RecommendationCardProps {
  icon: React.ReactNode
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

function RecommendationCard({ icon, title, description, priority }: RecommendationCardProps) {
  const priorityColor = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  }
  
  const priorityIcon = {
    low: <Clock className="h-3 w-3" />,
    medium: <AlertCircle className="h-3 w-3" />,
    high: <AlertCircle className="h-3 w-3" />
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-full">
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${priorityColor[priority]}`}>
            {priorityIcon[priority]}
            <span className="capitalize">{priority}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <Button className="w-full mt-4" variant="outline" asChild>
          <Link href={`/apps/documents/${title.toLowerCase().replace(/\s+/g, '-')}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

interface MicroAppCardProps {
  icon: React.ReactNode
  title: string
  href: string
}

function MicroAppCard({ icon, title, href }: MicroAppCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
        <CardContent className="flex flex-col items-center justify-center pt-6">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            {icon}
          </div>
          <h3 className="font-medium text-center">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}