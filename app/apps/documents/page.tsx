"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { FileText, Search, ArrowRight, Filter } from 'lucide-react'

export default function DocumentWizardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const documentCategories = [
    {
      id: 'essential',
      name: 'Essential Documents',
      documents: [
        {
          id: 'birth-certificate',
          title: 'Birth Certificate',
          description: 'Official record of birth issued by the government',
          complexity: 'medium',
          timeTaken: '2-3 weeks'
        },
        {
          id: 'citizenship',
          title: 'Citizenship Certificate',
          description: 'Primary national identity document for Nepali citizens',
          complexity: 'high',
          timeTaken: '3-4 weeks'
        },
        {
          id: 'passport',
          title: 'Passport',
          description: 'International travel document issued by the government',
          complexity: 'high',
          timeTaken: '4-6 weeks'
        }
      ]
    },
    {
      id: 'education',
      name: 'Education Documents',
      documents: [
        {
          id: 'see-certificate',
          title: 'SEE Certificate',
          description: 'Secondary Education Examination certificate',
          complexity: 'low',
          timeTaken: '1-2 weeks'
        },
        {
          id: 'character-certificate',
          title: 'Character Certificate',
          description: 'Certificate of good moral conduct from educational institution',
          complexity: 'low',
          timeTaken: '1 week'
        },
        {
          id: 'transcript',
          title: 'Academic Transcript',
          description: 'Official record of academic performance',
          complexity: 'medium',
          timeTaken: '2 weeks'
        }
      ]
    },
    {
      id: 'finance',
      name: 'Financial Documents',
      documents: [
        {
          id: 'pan-card',
          title: 'PAN Card',
          description: 'Permanent Account Number for tax identification',
          complexity: 'medium',
          timeTaken: '2-3 weeks'
        },
        {
          id: 'property-deed',
          title: 'Property Deed',
          description: 'Legal document for property ownership',
          complexity: 'high',
          timeTaken: '4-8 weeks'
        },
        {
          id: 'bank-account',
          title: 'Bank Account',
          description: 'Process for opening a bank account',
          complexity: 'low',
          timeTaken: '1-2 days'
        }
      ]
    },
    {
      id: 'travel',
      name: 'Travel & Transportation',
      documents: [
        {
          id: 'driving-license',
          title: 'Driving License',
          description: 'License to operate motor vehicles on public roads',
          complexity: 'medium',
          timeTaken: '3-4 weeks'
        },
        {
          id: 'vehicle-registration',
          title: 'Vehicle Registration',
          description: 'Process for registering a vehicle in your name',
          complexity: 'medium',
          timeTaken: '1-2 weeks'
        },
        {
          id: 'bluebook',
          title: 'Bluebook (Vehicle Ownership)',
          description: 'Official document of vehicle ownership',
          complexity: 'medium',
          timeTaken: '2 weeks'
        }
      ]
    },
    {
      id: 'family',
      name: 'Family Documents',
      documents: [
        {
          id: 'marriage-certificate',
          title: 'Marriage Certificate',
          description: 'Legal document certifying marriage',
          complexity: 'medium',
          timeTaken: '2 weeks'
        },
        {
          id: 'relationship-certificate',
          title: 'Relationship Certificate',
          description: 'Certificate proving family relationships',
          complexity: 'medium',
          timeTaken: '2-3 weeks'
        },
        {
          id: 'death-certificate',
          title: 'Death Certificate',
          description: 'Official document recording a person\'s death',
          complexity: 'medium',
          timeTaken: '1-2 weeks'
        }
      ]
    }
  ]
  
  // Filter documents based on search term
  const filterDocuments = () => {
    if (!searchTerm) return documentCategories
    
    return documentCategories.map(category => ({
      ...category,
      documents: category.documents.filter(
        doc => 
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.documents.length > 0)
  }
  
  const filteredCategories = filterDocuments()
  
  // Flatten all documents for the "All Documents" tab
  const allDocuments = documentCategories.flatMap(category => 
    category.documents.map(doc => ({
      ...doc,
      category: category.name
    }))
  )
  
  const filteredAllDocuments = allDocuments.filter(
    doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Document Wizard</h1>
          <p className="text-muted-foreground">
            Step-by-step guides for obtaining important documents throughout your life journey
          </p>
        </div>
        
        <div className="flex items-center relative max-w-xl">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <Button variant="ghost" size="icon" className="absolute right-1">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-muted w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            {documentCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAllDocuments.length > 0 ? (
                filteredAllDocuments.map(doc => (
                  <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    title={doc.title}
                    description={doc.description}
                    category={doc.category}
                    complexity={doc.complexity}
                    timeTaken={doc.timeTaken}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <p className="text-muted-foreground">No documents found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {documentCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.find(c => c.id === category.id)?.documents.length ? (
                  filteredCategories
                    .find(c => c.id === category.id)
                    ?.documents.map(doc => (
                      <DocumentCard
                        key={doc.id}
                        id={doc.id}
                        title={doc.title}
                        description={doc.description}
                        category={category.name}
                        complexity={doc.complexity}
                        timeTaken={doc.timeTaken}
                      />
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                    <p className="text-muted-foreground">No documents found matching your search in this category.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

interface DocumentCardProps {
  id: string
  title: string
  description: string
  category: string
  complexity: 'low' | 'medium' | 'high'
  timeTaken: string
}

function DocumentCard({ id, title, description, category, complexity, timeTaken }: DocumentCardProps) {
  const complexityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  }
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{category}</Badge>
          <Badge className={complexityColors[complexity]}>
            {complexity.charAt(0).toUpperCase() + complexity.slice(1)} Complexity
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Processing time: {timeTaken}
          </div>
          <Button asChild size="sm">
            <Link href={`/apps/documents/${id}`}>
              View Guide <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}