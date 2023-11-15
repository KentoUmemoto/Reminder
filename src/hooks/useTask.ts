import { SerializedTask } from '@/libs/utils'
import useSWR from 'swr'

async function fetcher<T>(key: string, init?: RequestInit): Promise<T> {
  return fetch(key, init).then((res) => res.json() as Promise<T>)
}

export function useTaskList() {
  const { data, error, mutate } = useSWR<SerializedTask[]>('/api/task', fetcher)
  return {
    tasks: data,
    error,
    mutate,
  }
}
