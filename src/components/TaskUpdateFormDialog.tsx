import { useForm } from 'react-hook-form'
import { TaskFormDialog } from '@/components/TaskFormDialog'
import { RepeatType } from '@prisma/client'
import { Input, Select, Button, Modal } from 'react-daisyui'
import { formatDate } from '@/libs/utils'
import { useEffect, useState } from 'react'
import { SerializedTask } from '@/libs/utils'

type Props = {
  mutate: Function
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  task: SerializedTask | undefined
}

type FormData = {
  name: string
  start: string
  type: RepeatType
}

export const TaskUpdateFormDialog = ({ mutate, isOpen, setIsOpen, task }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: task?.name,
      start: formatDate(task?.start),
      type: task?.repeatType,
    },
  })

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('api/task/' + task?.id, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.status === 200) {
      mutate()
      setIsOpen(false)
      reset()
    }
  })

  const onDeleteButtonClick = async () => {
    const res = await fetch('api/task/' + task?.id, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task),
    })
    if (res.status === 200) {
      mutate()
      setIsOpen(false)
      setIsDeleteOpen(false)
      reset()
    }
  }

  const options = [
    {
      value: RepeatType.ONCE,
      label: '1回だけ',
    },
    { value: RepeatType.WEEK, label: '週' },
    { value: RepeatType.MONTH, label: '月' },
    { value: RepeatType.YEAR, label: '年' },
  ]

  useEffect(() => {
    if (task) {
      setValue('name', task.name)
      setValue('start', formatDate(task.start))
      setValue('type', task.repeatType)
    }
  }, [task])

  return (
    <TaskFormDialog title={'タスクの編集'} isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmit} className='grid grid-cols-1 gap-3'>
        <Input type='text' placeholder='name' {...register('name', { required: true })} />
        <p>{errors.name?.message}</p>
        <Input type='datetime-local' {...register('start')} />
        <p>{errors.start?.message}</p>
        <Select {...register('type')}>
          {options.map((option) => {
            return (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            )
          })}
        </Select>
        <p>{errors.type?.message}</p>
        <Input className='btn btn-primary' type='submit' value={'更新'} />
        <Button color={'secondary'} type='button' onClick={() => setIsDeleteOpen(true)}>
          削除
        </Button>
      </form>

      <Modal open={isDeleteOpen} className='p-0'>
        <div className='p-6 flex flex-col'>
          <Modal.Header className='font-bold'>{'削除しますか？'}</Modal.Header>
          <Modal.Body className='flex flex-col'>
            <Button color={'secondary'} onClick={onDeleteButtonClick}>
              削除
            </Button>
            <Button className='mt-4' onClick={() => setIsDeleteOpen(false)}>
              キャンセル
            </Button>
          </Modal.Body>
          <Modal.Actions>
            <Button
              onClick={() => setIsDeleteOpen(false)}
              size='sm'
              color='ghost'
              shape='circle'
              className='absolute right-2 top-2'
            >
              x
            </Button>
          </Modal.Actions>
        </div>
      </Modal>
    </TaskFormDialog>
  )
}
