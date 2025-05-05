"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Clock,
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface DocumentsSectionProps {
  ageGroup: string
}

// Document type and mock data
type DocumentStatus = 'completed' | 'pending' | 'not-started'

interface Document {
  id: string
  name: string
  category: string
  status: DocumentStatus
  dueDate?: string
  description: string
}

export default function DocumentsSection({ ageGroup }: DocumentsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Generate age-appropriate documents
  const getDocuments = (): Document[] => {
    const baseDocuments: Document[] = [
      {
        id: 'birth-cert',
        name: 'Birth Certificate',
        category: 'Essential',
        status: 'completed',
        description: 'Official record of birth issued by the government'
      },
    ]
    
    const childDocuments: Document[] = [
      {
        id: 'school-id',
        name: 'School ID Card',
        category: 'Education',
        status: 'completed',
        description: 'Identification card issued by educational institution'
      },
      {
        id: 'vaccination-card',
        name: 'Vaccination Card',
        category: 'Health',
        status: 'pending',
        dueDate: '2025-06-10',
        description: 'Record of received vaccinations and schedule'
      }
    ]
    
    const youthDocuments: Document[] = [
      {
        id: 'citizenship',
        name: 'Citizenship Certificate',
        category: 'Essential',
        status: 'not-started',
        dueDate: '2025-07-15',
        description: 'Primary national identity document for Nepali citizens'
      },
      {
        id: 'voter-id',
        name: 'Voter ID Card',
        category: 'Government',
        status: 'not-started',
        description: 'Required for participating in national elections'
      },
      {
        id: 'driving-license',
        name: 'Driving License',
        category: 'Transportation',
        status: 'pending',
        dueDate: '2025-08-22',
        description: 'License to operate motor vehicles on public roads'
      }
    ]
    
    const adultDocuments: Document[] = [
      {
        id: 'passport',
        name: 'Passport',
        category: 'Travel',
        status: 'completed',
        description: 'International travel document issued by the government'
      },
      {
        id: 'pan-card',
        name: 'PAN Card',
        category: 'Financial',
        status: 'pending',
        dueDate: '2025-09-30',
        description: 'Permanent Account Number for tax identification'
      },
      {
        id: 'marriage-cert',
        name: 'Marriage Certificate',
        category: 'Family',
        status: 'not-started',
        description: 'Legal document certifying marriage'
      },
      {
        id: 'property-deed',
        name: 'Property Deed',
        category: 'Assets',
        status: 'not-started',
        description: 'Legal document for property ownership'
      }
    ]
    
    const seniorDocuments: Document[] = [
      {
        id: 'senior-id',
        name: 'Senior Citizen ID',
        category: 'Government',
        status: 'not-started',
        dueDate: '2025-10-15',
        description: 'ID card that provides special benefits to senior citizens'
      },
      {
        id: 'pension-papers',
        name: 'Pension Papers',
        category: 'Financial',
        status: 'not-started',
        description: 'Documents related to retirement benefits'
      },
      {
        id: 'health-card',
        name: 'Health Insurance Card',
        category: 'Health',
        status: 'pending',
        dueDate: '2025-11-05',
        description: 'Card for accessing health insurance benefits'
      },
      {
        id: 'will',
        name: 'Will & Testament',
        category: 'Legal',
        status: 'not-started',
        description: 'Legal document specifying asset distribution'
      }
    ]
    
    switch (ageGroup) {
      case 'child':
        return [...baseDocuments, ...childDocuments]
      case 'youth':
        return [...baseDocuments, ...childDocuments, ...youthDocuments]
      case 'adult':
        return [...baseDocuments, ...youthDocuments, ...adultDocuments]
      case 'senior':
        return [...baseDocuments, ...adultDocuments, ...seniorDocuments]
      default:
        return baseDocuments
    }
  }
  
  const documents = getDocuments()
  
  const completedDocs = documents.filter(doc => doc.status === 'completed')
  const pendingDocs = documents.filter(doc => doc.status === 'pending')
  const notStartedDocs = documents.filter(doc => doc.status === 'not-started')
  
  const filterDocuments = (docs: Document[]) => {
    if (!searchTerm) return docs
    return docs.filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Tracker</CardTitle>
          <CardDescription>
            Track and manage important documents throughout your life journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">
                  All ({documents.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedDocs.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({pendingDocs.length})
                </TabsTrigger>
                <TabsTrigger value="not-started">
                  Not Started ({notStartedDocs.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {filterDocuments(documents).length > 0 ? (
                  filterDocuments(documents).map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No documents found matching your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                {filterDocuments(completedDocs).length > 0 ? (
                  filterDocuments(completedDocs).map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No completed documents found.</p>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4">
                {filterDocuments(pendingDocs).length > 0 ? (
                  filterDocuments(pendingDocs).map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No pending documents found.</p>
                )}
              </TabsContent>
              
              <TabsContent value="not-started" className="space-y-4">
                {filterDocuments(notStartedDocs).length > 0 ? (
                  filterDocuments(notStartedDocs).map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No not-started documents found.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DocumentCard({ document }: { document: Document }) {
  const statusInfo = {
    completed: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: 'Completed',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-800 dark:text-green-300'
    },
    pending: {
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      text: 'Pending',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-800 dark:text-yellow-300'
    },
    'not-started': {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      text: 'Not Started',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-800 dark:text-red-300'
    }
  }
  
  const status = statusInfo[document.status]
  
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{document.name}</h3>
                <Badge variant="outline" className="mt-1">
                  {document.category}
                </Badge>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${status.bgColor} ${status.textColor}`}>
              {status.icon}
              <span>{status.text}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {document.description}
          </p>
          
          {document.dueDate && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
              <AlertCircle className="h-4 w-4" />
              <span>Due by: {new Date(document.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/apps/documents/${document.id}`}>
                <Eye className="h-4 w-4 mr-1" /> View
              </Link>
            </Button>
            {document.status === 'completed' && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            )}
            {document.status !== 'completed' && (
              <Button variant="default" size="sm" asChild>
                <Link href={`/apps/documents/${document.id}/apply`}>
                  Get Started
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}