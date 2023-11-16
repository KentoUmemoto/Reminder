import { Spinner } from '@/components/Spinner'
import { TaskLayout } from '@/components/TaskLayout'
import { TaskList } from '@/components/TaskList'
import { useTaskList } from '@/hooks/useTask'
import { SerializedTask } from '@/libs/utils'
import { useCreateFormDialog } from '@/store/CreateFormDialogStore'
import { useUpdateFormDialog } from '@/store/UpdateFormDialogStore'

const TaskPage = () => {
  const { tasks, error, mutate } = useTaskList(() => {
    setCreateFormDialogMutate(mutate)
    setUpdateFormDialogMutate(mutate)
  })
  const { setMutate: setCreateFormDialogMutate } = useCreateFormDialog()
  const {
    setIsOpen: setUpdateDialogIsOpen,
    setTask: setUpdateTask,
    setMutate: setUpdateFormDialogMutate,
  } = useUpdateFormDialog()

  function onClickTask(task: SerializedTask) {
    setUpdateDialogIsOpen(true)
    setUpdateTask(task)
  }

  //error fetch
  if (error) return <div>An error occured.</div>
  // loading
  if (!tasks) return <Spinner />

  return (
    <TaskLayout>
      <TaskList tasks={tasks} onClickTask={onClickTask} />
    </TaskLayout>
  )
}

TaskPage.auth = true

export default TaskPage
