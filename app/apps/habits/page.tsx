"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Plus,
  Target,
  Trophy,
  Calendar,
  CheckCircle2,
  XCircle,
  Trash2,
  Star,
  TrendingUp
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Habit {
  id: string
  title: string
  description: string
  category: string
  frequency: 'daily' | 'weekly' | 'monthly'
  streak: number
  completed: boolean
  progress: number
  startDate: string
}

export default function HabitTrackerPage() {
  const { toast } = useToast()
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Morning Exercise',
      description: '30 minutes of physical activity',
      category: 'Health',
      frequency: 'daily',
      streak: 5,
      completed: false,
      progress: 70,
      startDate: '2025-03-01'
    },
    {
      id: '2',
      title: 'Read Books',
      description: 'Read for 20 minutes',
      category: 'Education',
      frequency: 'daily',
      streak: 3,
      completed: true,
      progress: 90,
      startDate: '2025-03-05'
    }
  ])
  
  const [newHabit, setNewHabit] = useState<Omit<Habit, 'id' | 'streak' | 'completed' | 'progress' | 'startDate'>>({
    title: '',
    description: '',
    category: '',
    frequency: 'daily'
  })

  const addHabit = () => {
    if (!newHabit.title) {
      toast({
        title: "Missing Information",
        description: "Please enter a habit title.",
        variant: "destructive"
      })
      return
    }
    
    const habit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      ...newHabit,
      streak: 0,
      completed: false,
      progress: 0,
      startDate: new Date().toISOString().split('T')[0]
    }
    
    setHabits([...habits, habit])
    setNewHabit({
      title: '',
      description: '',
      category: '',
      frequency: 'daily'
    })
    
    toast({
      title: "Habit Added",
      description: "Your new habit has been created successfully."
    })
  }
  
  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const completed = !habit.completed
        return {
          ...habit,
          completed,
          streak: completed ? habit.streak + 1 : habit.streak,
          progress: completed ? Math.min(100, habit.progress + 10) : habit.progress
        }
      }
      return habit
    }))
  }
  
  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id))
    toast({
      title: "Habit Deleted",
      description: "The habit has been removed from your tracker."
    })
  }
  
  const completedHabits = habits.filter(habit => habit.completed)
  const totalProgress = habits.length > 0
    ? Math.round(habits.reduce((acc, habit) => acc + habit.progress, 0) / habits.length)
    : 0
  
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Habit Tracker</h1>
          <p className="text-muted-foreground">
            Build and maintain positive habits
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Your habit completion rate</CardDescription>
            
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{totalProgress}%</span>
                  <Badge variant="outline">
                    {completedHabits.length}/{habits.length} Completed
                  </Badge>
                </div>
                <Progress value={totalProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Longest Streak</CardTitle>
              <CardDescription>Your best performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-2xl font-bold">
                    {Math.max(...habits.map(h => h.streak))} days
                  </span>
                  <p className="text-sm text-muted-foreground">Keep it up!</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Add New Habit</CardTitle>
              <CardDescription>Start tracking a new habit</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={addHabit}>
                <Plus className="h-4 w-4 mr-2" />
                Create Habit
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>New Habit</CardTitle>
                <CardDescription>
                  Define your new habit to track
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Habit Title</Label>
                <Input
                  id="title"
                  value={newHabit.title}
                  onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                  placeholder="e.g., Morning Exercise"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                  placeholder="Add details about your habit"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newHabit.category}
                  onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
                  placeholder="e.g., Health, Education, Career"
                />
              </div>
              <div className="grid gap-2">
                <Label>Frequency</Label>
                <div className="flex gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                    <Button
                      key={freq}
                      variant={newHabit.frequency === freq ? 'default' : 'outline'}
                      onClick={() => setNewHabit({ ...newHabit, frequency: freq })}
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={() => toggleHabit(habit.id)}
              onDelete={() => deleteHabit(habit.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface HabitCardProps {
  habit: Habit
  onToggle: () => void
  onDelete: () => void
}

function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={habit.completed ? 'text-primary' : ''}
              onClick={onToggle}
            >
              {habit.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2" />
              )}
            </Button>
            <div>
              <h3 className="font-medium">{habit.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {habit.description}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{habit.category}</Badge>
                <Badge variant="outline">
                  {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Started {new Date(habit.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>{habit.streak} day streak</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Progress value={habit.progress} className="w-24 h-2" />
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
