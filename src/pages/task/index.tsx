import { SerializedTask } from '@/libs/utils'
import { Spinner } from '@/components/Spinner'
import { TaskList } from '@/components/TaskList'
import { useTaskList } from '@/hooks/useTask'
import { useCreateFormDialog } from '@/store/CreateFormDialogStore'
import { useUpdateFormDialog } from '@/store/UpdateFormDialogStore'
import { TaskLayout } from '@/components/TaskLayout'

const TaskPage = () => {
  const { tasks, error, mutate } = useTaskList(() => {
    setCreateFormDialogMutate(mutate)
    setUpdateFormDialogMutate(mutate)
  })
  const { setIsOpen: setCreateDialogIsOpen, setMutate: setCreateFormDialogMutate } =
    useCreateFormDialog()
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
