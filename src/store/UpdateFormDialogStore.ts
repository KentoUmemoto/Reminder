import { SerializedTask } from '@/libs/utils'
import { KeyedMutator } from 'swr'
import { create } from 'zustand'

type UpdateFormDialogState = {
  isOpen: boolean
  mutate: KeyedMutator<SerializedTask[]> | undefined
  task: SerializedTask | undefined
  setIsOpen: (open: boolean) => void
  setMutate: (mt: KeyedMutator<SerializedTask[]>) => void
  setTask: (tk: SerializedTask) => void
}

export const useUpdateFormDialog = create<UpdateFormDialogState>()((set) => ({
  isOpen: false,
  mutate: undefined,
  task: undefined,
  setIsOpen: (open) => set({ isOpen: open }),
  setMutate: (mt) => set({ mutate: mt }),
  setTask: (tk) => set({ task: tk }),
}))
