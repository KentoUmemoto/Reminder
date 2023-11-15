import { SerializedTask } from '@/libs/utils'
import { Card } from 'react-daisyui'

type Props = {
  tasks: SerializedTask[]
  onClickTask: (task: SerializedTask) => void
}

export function TaskList({ tasks, onClickTask }: Props) {
  return (
    <div className='grid grid-cols-1 gap-2'>
      {tasks.map((task) => {
        return (
          <Card
            key={task.id}
            className='grid bg-base-200 py-2 rounded-box place-items-center'
            onClick={() => onClickTask(task)}
          >
            {task.name}
          </Card>
        )
      })}
    </div>
  )
}
