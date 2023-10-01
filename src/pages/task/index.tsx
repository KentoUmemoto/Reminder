import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { Task } from '@prisma/client'
import { Spinner } from '@/components/Spinner'
import { TaskCreateFormDialog } from '@/components/TaskCreateFormDialog'
import { useState } from 'react'

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) => res.json() as Promise<Task[] | null>)
}

const TaskPage = () => {
  const { data: session } = useSession()
  const { data: tasks, error, mutate } = useSWR('/api/task', fetcher)
  let [createDialogIsOpen, setCreateDialogIsOpen] = useState(false)

  //error fetch
  if (error) return <div>An error occured.</div>
  // loading
  if (!tasks) return <Spinner />
  return (
    <div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
      <button
        type='button'
        onClick={() => setCreateDialogIsOpen(true)}
        className='btn btn-primary'
      >
        create task
      </button>
      <TaskCreateFormDialog
        mutate={mutate}
        isOpen={createDialogIsOpen}
        setIsOpen={setCreateDialogIsOpen}
      />
    </div>
  )
}

TaskPage.auth = true

export default TaskPage
