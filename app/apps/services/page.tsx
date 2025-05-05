"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search,
  MapPin,
  Phone,
  Clock,
  Building,
  Star,
  Filter,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

interface Service {
  id: string
  name: string
  category: string
  address: string
  contact: string
  hours: string
  rating: number
  reviews: number
  distance: string
  services: string[]
}

const services: Service[] = [
  {
    id: '1',
    name: 'Kathmandu District Administration Office',
    category: 'Government',
    address: 'Babar Mahal, Kathmandu',
    contact: '01-4256789',
    hours: 'Sun-Fri 10:00 AM - 4:00 PM',
    rating: 4.2,
    reviews: 128,
    distance: '2.5 km',
    services: [
      'Citizenship Certificate',
      'Passport Application',
      'Document Verification'
    ]
  },
  {
    id: '2',
    name: 'Civil Hospital',
    category: 'Healthcare',
    address: 'Minbhawan, Kathmandu',
    contact: '01-4107000',
    hours: '24/7',
    rating: 4.5,
    reviews: 256,
    distance: '1.8 km',
    services: [
      'Emergency Care',
      'General Medicine',
      'Vaccination'
    ]
  },
  {
    id: '3',
    name: 'Department of Transport Management',
    category: 'Government',
    address: 'Ekantakuna, Lalitpur',
    contact: '01-5555555',
    hours: 'Sun-Fri 10:00 AM - 4:00 PM',
    rating: 3.8,
    reviews: 92,
    distance: '4.2 km',
    services: [
      'Driving License',
      'Vehicle Registration',
      'Route Permits'
    ]
  }
]

export default function LocalServicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const categories = Array.from(
    new Set(services.map(service => service.category))
  )
  
  const filterServices = (services: Service[]) => {
    return services.filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = 
        selectedCategory === 'all' || service.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }
  
  const filteredServices = filterServices(services)
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Local Services</h1>
          <p className="text-muted-foreground">
            Find nearby government offices, healthcare facilities, and more
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
              All Services
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase()}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <p className="text-muted-foreground">No services found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category.toLowerCase()} className="mt-6">
              <div className="grid gap-4">
                {filteredServices
                  .filter(service => service.category === category)
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))
                }
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-medium">{service.name}</h3>
                <Badge variant="outline" className="mt-1">
                  {service.category}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{service.rating}</span>
                <span className="text-muted-foreground">
                  ({service.reviews} reviews)
                </span>
              </div>
            </div>
            
            <div className="grid gap-2 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{service.address}</span>
                <Badge variant="secondary" className="ml-2">
                  {service.distance}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{service.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{service.hours}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Available Services:</h4>
              <div className="flex flex-wrap gap-2">
                {service.services.map((service, index) => (
                  <Badge key={index} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 md:w-48">
            <Button className="w-full">
              Get Directions
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" className="w-full">
              View Details
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}