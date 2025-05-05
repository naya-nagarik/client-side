"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { 
  Bell, 
  Calendar as CalendarIcon, 
  Clock, 
  Trash2, 
  Plus,
  CheckCircle2,
  AlertCircle,
  Check
} from 'lucide-react'
import { format } from 'date-fns'

interface RemindersSectionProps {
  ageGroup: string
}

type ReminderPriority = 'low' | 'medium' | 'high'

interface Reminder {
  id: string
  title: string
  date: Date
  category: string
  priority: ReminderPriority
  completed: boolean
}

export default function RemindersSection({ ageGroup }: RemindersSectionProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  // Generate age-appropriate reminders
  const getReminders = (): Reminder[] => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)
    
    const nextMonth = new Date(today)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    
    const baseReminders: Reminder[] = [
      {
        id: 'reminder-1',
        title: 'Update personal information',
        date: nextMonth,
        category: 'General',
        priority: 'low',
        completed: false
      }
    ]
    
    const childReminders: Reminder[] = [
      {
        id: 'reminder-2',
        title: 'School enrollment deadline',
        date: nextWeek,
        category: 'Education',
        priority: 'high',
        completed: false
      },
      {
        id: 'reminder-3',
        title: 'Vaccination appointment',
        date: tomorrow,
        category: 'Health',
        priority: 'high',
        completed: false
      }
    ]
    
    const youthReminders: Reminder[] = [
      {
        id: 'reminder-4',
        title: 'Citizenship application deadline',
        date: nextWeek,
        category: 'Document',
        priority: 'high',
        completed: false
      },
      {
        id: 'reminder-5',
        title: 'College application deadline',
        date: nextMonth,
        category: 'Education',
        priority: 'medium',
        completed: false
      },
      {
        id: 'reminder-6',
        title: 'Driving license test',
        date: tomorrow,
        category: 'Transportation',
        priority: 'medium',
        completed: true
      }
    ]
    
    const adultReminders: Reminder[] = [
      {
        id: 'reminder-7',
        title: 'Passport renewal deadline',
        date: nextMonth,
        category: 'Document',
        priority: 'medium',
        completed: false
      },
      {
        id: 'reminder-8',
        title: 'Tax filing deadline',
        date: nextWeek,
        category: 'Financial',
        priority: 'high',
        completed: false
      },
      {
        id: 'reminder-9',
        title: 'Property tax payment',
        date: tomorrow,
        category: 'Financial',
        priority: 'high',
        completed: false
      }
    ]
    
    const seniorReminders: Reminder[] = [
      {
        id: 'reminder-10',
        title: 'Senior citizen ID application',
        date: nextWeek,
        category: 'Document',
        priority: 'high',
        completed: false
      },
      {
        id: 'reminder-11',
        title: 'Health check-up appointment',
        date: tomorrow,
        category: 'Health',
        priority: 'high',
        completed: false
      },
      {
        id: 'reminder-12',
        title: 'Pension document submission',
        date: nextMonth,
        category: 'Financial',
        priority: 'medium',
        completed: false
      }
    ]
    
    switch (ageGroup) {
      case 'child':
        return [...baseReminders, ...childReminders]
      case 'youth':
        return [...baseReminders, ...childReminders, ...youthReminders]
      case 'adult':
        return [...baseReminders, ...youthReminders, ...adultReminders]
      case 'senior':
        return [...baseReminders, ...adultReminders, ...seniorReminders]
      default:
        return baseReminders
    }
  }
  
  const reminders = getReminders()
  
  // Filter reminders based on date selection and status
  const todayReminders = reminders.filter(reminder => 
    reminder.date.toDateString() === new Date().toDateString() && !reminder.completed
  )
  
  const upcomingReminders = reminders.filter(reminder => 
    reminder.date > new Date() && !reminder.completed
  )
  
  const completedReminders = reminders.filter(reminder => 
    reminder.completed
  )
  
  const selectedDateReminders = reminders.filter(reminder => 
    date && reminder.date.toDateString() === date.toDateString()
  )
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reminders & Notifications</CardTitle>
              <CardDescription>
                Never miss important deadlines and appointments
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="today">
                Today ({todayReminders.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingReminders.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedReminders.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="today">
              {todayReminders.length > 0 ? (
                <div className="space-y-4">
                  {todayReminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No reminders for today.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming">
              {upcomingReminders.length > 0 ? (
                <div className="space-y-4">
                  {upcomingReminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No upcoming reminders.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedReminders.length > 0 ? (
                <div className="space-y-4">
                  {completedReminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No completed reminders.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>
              Browse and manage your reminders by date
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
            <CardTitle>
              {date ? format(date, 'PPP') : 'Select a date'}
            </CardTitle>
            <CardDescription>
              Reminders for the selected date
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateReminders.length > 0 ? (
              <div className="space-y-4">
                {selectedDateReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} isCompact />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No reminders for this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface ReminderCardProps {
  reminder: Reminder
  isCompact?: boolean
}

function ReminderCard({ reminder, isCompact = false }: ReminderCardProps) {
  const [completed, setCompleted] = useState(reminder.completed)
  
  const priorityColors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  }
  
  const handleComplete = () => {
    setCompleted(!completed)
  }
  
  if (isCompact) {
    return (
      <div className={`p-3 border rounded-md flex items-center justify-between ${completed ? 'opacity-60' : ''}`}>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6"
            onClick={handleComplete}
          >
            {completed ? 
              <CheckCircle2 className="h-5 w-5 text-primary" /> : 
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
            }
          </Button>
          <span className={completed ? 'line-through text-muted-foreground' : ''}>
            {reminder.title}
          </span>
        </div>
        <Badge className={priorityColors[reminder.priority]}>
          {reminder.priority}
        </Badge>
      </div>
    )
  }
  
  return (
    <Card className={`${completed ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="mt-0.5"
              onClick={handleComplete}
            >
              {completed ? 
                <CheckCircle2 className="h-5 w-5 text-primary" /> : 
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              }
            </Button>
            <div>
              <h3 className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}>
                {reminder.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>{format(reminder.date, 'PPP')}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{format(reminder.date, 'p')}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{reminder.category}</Badge>
                <Badge className={priorityColors[reminder.priority]}>
                  {reminder.priority}
                </Badge>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}