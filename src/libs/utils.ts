import { Task } from '@prisma/client'

export function formatDate(date: string | undefined): string {
  if (date) {
    return date.slice(0, -8)
  } else {
    return ''
  }
}

export type SerializedTask = Omit<Task, 'createdAt' | 'updatedAt' | 'start'> & {
  start: string
  createdAt: string
  updatedAt: string
}
