import { useSession } from 'next-auth/react'
import { SerializedTask } from '@/libs/utils'
import { Spinner } from '@/components/Spinner'
import { TaskCreateFormDialog } from '@/components/TaskCreateFormDialog'
import { TaskUpdateFormDialog } from '@/components/TaskUpdateFormDialog'
import { TaskList } from '@/components/TaskList'
import { useState } from 'react'
import { useTaskList } from '@/hooks/useTask'

const TaskPage = () => {
  const { data: session } = useSession()
  const { tasks, error, mutate } = useTaskList()
  let [createDialogIsOpen, setCreateDialogIsOpen] = useState(false)
  let [updateDialogIsOpen, setUpdateDialogIsOpen] = useState(false)
  let [updateTask, setUpdateTask] = useState<SerializedTask>()

  function onClickTask(task: SerializedTask) {
    setUpdateDialogIsOpen(true)
    setUpdateTask(task)
  }

  //error fetch
  if (error) return <div>An error occured.</div>
  // loading
  if (!tasks) return <Spinner />
  return (
    <div className='flex flex-col justify-center px-32'>
      <TaskList tasks={tasks} onClickTask={onClickTask} />
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
      <TaskUpdateFormDialog
        mutate={mutate}
        isOpen={updateDialogIsOpen}
        setIsOpen={setUpdateDialogIsOpen}
        task={updateTask}
      />
    </div>
  )
}

TaskPage.auth = true

export default TaskPage
