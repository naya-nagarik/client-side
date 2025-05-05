"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search,
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  Bookmark,
  Filter
} from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'document'
  category: string
  language: 'en' | 'ne'
  url: string
  thumbnail?: string
  dateAdded: string
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Guide to Citizenship Application Process',
    description: 'Step-by-step guide on how to apply for Nepali citizenship, including required documents and procedures.',
    type: 'article',
    category: 'Documents',
    language: 'en',
    url: '#',
    dateAdded: '2025-03-15'
  },
  {
    id: '2',
    title: 'नागरिकता आवेदन प्रक्रिया गाइड',
    description: 'नेपाली नागरिकता आवेदन कसरी दिने भन्ने बारे विस्तृत जानकारी।',
    type: 'article',
    category: 'Documents',
    language: 'ne',
    url: '#',
    dateAdded: '2025-03-15'
  },
  {
    id: '3',
    title: 'Understanding Your Rights as a Nepali Citizen',
    description: 'Comprehensive overview of citizen rights and responsibilities in Nepal.',
    type: 'video',
    category: 'Legal',
    language: 'en',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
    dateAdded: '2025-03-10'
  },
  {
    id: '4',
    title: 'Career Opportunities in Nepal',
    description: 'Explore various career paths and job opportunities available in Nepal.',
    type: 'document',
    category: 'Career',
    language: 'en',
    url: '#',
    dateAdded: '2025-03-05'
  }
]

export default function ResourceLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'en' | 'ne'>('all')
  
  const filterResources = (resources: Resource[]) => {
    return resources.filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesLanguage = 
        selectedLanguage === 'all' || resource.language === selectedLanguage
      
      return matchesSearch && matchesLanguage
    })
  }
  
  const articles = filterResources(resources.filter(r => r.type === 'article'))
  const videos = filterResources(resources.filter(r => r.type === 'video'))
  const documents = filterResources(resources.filter(r => r.type === 'document'))
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Resource Library</h1>
          <p className="text-muted-foreground">
            Access guides, tutorials, and educational content
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedLanguage === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedLanguage('all')}
            >
              All
            </Button>
            <Button
              variant={selectedLanguage === 'en' ? 'default' : 'outline'}
              onClick={() => setSelectedLanguage('en')}
            >
              English
            </Button>
            <Button
              variant={selectedLanguage === 'ne' ? 'default' : 'outline'}
              onClick={() => setSelectedLanguage('ne')}
            >
              नेपाली
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6">
              {articles.length > 0 && (
                <ResourceSection
                  title="Articles"
                  description="Written guides and tutorials"
                  resources={articles}
                />
              )}
              {videos.length > 0 && (
                <ResourceSection
                  title="Videos"
                  description="Video tutorials and explanations"
                  resources={videos}
                />
              )}
              {documents.length > 0 && (
                <ResourceSection
                  title="Documents"
                  description="Downloadable resources and templates"
                  resources={documents}
                />
              )}
              {articles.length === 0 && videos.length === 0 && documents.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <p className="text-muted-foreground">No resources found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="mt-6">
            {articles.length > 0 ? (
              <ResourceSection
                title="Articles"
                description="Written guides and tutorials"
                resources={articles}
              />
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">No articles found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            {videos.length > 0 ? (
              <ResourceSection
                title="Videos"
                description="Video tutorials and explanations"
                resources={videos}
              />
            ) : (
              <div className="text-center py-12">
                <Video className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">No videos found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            {documents.length > 0 ? (
              <ResourceSection
                title="Documents"
                description="Downloadable resources and templates"
                resources={documents}
              />
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">No documents found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface ResourceSectionProps {
  title: string
  description: string
  resources: Resource[]
}

function ResourceSection({ title, description, resources }: ResourceSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  const typeIcon = {
    article: <FileText className="h-5 w-5" />,
    video: <Video className="h-5 w-5" />,
    document: <FileText className="h-5 w-5" />
  }
  
  return (
    <Card>
      {resource.thumbnail && (
        <div className="relative aspect-video">
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="mb-2">
            {resource.category}
          </Badge>
          <Badge>
            {resource.language === 'en' ? 'English' : 'नेपाली'}
          </Badge>
        </div>
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {typeIcon[resource.type]}
            <span className="text-sm text-muted-foreground capitalize">
              {resource.type}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm">
              {resource.type === 'document' ? (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}