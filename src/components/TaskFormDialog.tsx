import { ReactNode, useRef } from 'react'
import { Button, Modal } from 'react-daisyui'
import { useOnClickOutside } from 'usehooks-ts'

type Props = {
  title: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: ReactNode
}

export const TaskFormDialog = ({ title, isOpen, setIsOpen, children }: Props) => {
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })
  return (
    <Modal open={isOpen} backdrop className='p-0'>
      <div className='p-6' ref={ref}>
        <Modal.Header className='font-bold'>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Actions>
          <Button
            onClick={() => setIsOpen(false)}
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
  )
}
