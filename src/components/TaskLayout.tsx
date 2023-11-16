import { TaskCreateFormDialog } from '@/components/TaskCreateFormDialog'
import { TaskUpdateFormDialog } from '@/components/TaskUpdateFormDialog'
import { ReactNode } from 'react'
import { useCreateFormDialog } from '@/store/CreateFormDialogStore'

interface Props {
  children: ReactNode
}

export const TaskLayout = ({ children }: Props) => {
  const { setIsOpen: setCreateDialogIsOpen } = useCreateFormDialog()
  return (
    <div className='flex flex-col justify-center md:px-32'>
      {children}
      <button
        type='button'
        onClick={() => setCreateDialogIsOpen(true)}
        className='btn btn-primary mt-2'
      >
        create task
      </button>
      <TaskCreateFormDialog />
      <TaskUpdateFormDialog />
    </div>
  )
}
