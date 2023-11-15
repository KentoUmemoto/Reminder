import { useForm } from 'react-hook-form'
import { TaskFormDialog } from '@/components/TaskFormDialog'
import { RepeatType } from '@prisma/client'
import { Input, Select } from 'react-daisyui'

type Props = {
  mutate: Function
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type FormData = {
  name: String
  start: Date
  type: RepeatType
}

export const TaskCreateFormDialog = ({ mutate, isOpen, setIsOpen }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('api/task', {
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

  return (
    <TaskFormDialog title={'タスクの作成'} isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmit} className='grid grid-cols-1 gap-3'>
        <Input type='text' placeholder='name' {...register('name', { required: true })} />
        <p>{errors.name?.message}</p>
        <Input type='datetime-local' {...register('start')} />
        <p>{errors.start?.message}</p>
        <Select {...register('type')}>
          <Select.Option value={RepeatType.ONCE}>1回だけ</Select.Option>
          <Select.Option value={RepeatType.WEEK}>週</Select.Option>
          <Select.Option value={RepeatType.MONTH}>月</Select.Option>
          <Select.Option value={RepeatType.YEAR}>年</Select.Option>
        </Select>
        <p>{errors.type?.message}</p>
        <Input className='btn btn-primary' type='submit' value={'作成'} />
      </form>
    </TaskFormDialog>
  )
}
