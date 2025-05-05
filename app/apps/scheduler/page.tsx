"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar as CalendarIcon,
  Clock,
  Plus,
  X,
  Check,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

interface Event {
  id: string
  title: string
  date: Date
  time: string
  category: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

export default function SchedulerPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Citizenship Application',
      date: new Date(),
      time: '10:00',
      category: 'Documents',
      description: 'Submit citizenship application at District Administration Office',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Health Checkup',
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: '14:30',
      category: 'Health',
      description: 'Annual health checkup at City Hospital',
      priority: 'medium'
    }
  ])
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    category: '',
    description: '',
    priority: 'medium' as const
  })
  
  const addEvent = () => {
    if (!date || !newEvent.title || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }
    
    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      date: date,
      ...newEvent
    }
    
    setEvents([...events, event])
    setNewEvent({
      title: '',
      time: '',
      category: '',
      description: '',
      priority: 'medium'
    })
    
    toast({
      title: "Event Added",
      description: "Your event has been scheduled successfully."
    })
  }
  
  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
    toast({
      title: "Event Deleted",
      description: "The event has been removed from your schedule."
    })
  }
  
  const selectedDateEvents = events.filter(
    event => event.date.toDateString() === (date?.toDateString() || '')
  )
  
  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Scheduler</h1>
          <p className="text-muted-foreground">
            Manage your appointments, deadlines, and important dates
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view or add events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {date ? format(date, 'PPP') : 'Select a date'}
                  </CardTitle>
                  <CardDescription>
                    Events for the selected date
                  </CardDescription>
                </div>
                <Button onClick={addEvent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                      placeholder="e.g., Documents, Health, Education"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Add event details"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              View and manage your scheduled events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="selected" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selected">Selected Date</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              
              <TabsContent value="selected" className="mt-4">
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onDelete={() => deleteEvent(event.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                    <p className="text-muted-foreground">No events scheduled for this date.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-4">
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onDelete={() => deleteEvent(event.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                    <p className="text-muted-foreground">No upcoming events scheduled.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface EventCardProps {
  event: Event
  onDelete: () => void
}

function EventCard({ event, onDelete }: EventCardProps) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  }
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {event.description}
                </p>
              )}
              <div className="flex gap-2 mt-2">
                {event.category && (
                  <Badge variant="outline">{event.category}</Badge>
                )}
                <Badge className={priorityColors[event.priority]}>
                  {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}