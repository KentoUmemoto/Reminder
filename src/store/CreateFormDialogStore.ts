import { SerializedTask } from '@/libs/utils'
import { KeyedMutator } from 'swr'
import { create } from 'zustand'

type CreateFormDialogState = {
  isOpen: boolean
  mutate: KeyedMutator<SerializedTask[]> | undefined
  setIsOpen: (open: boolean) => void
  setMutate: (mt: KeyedMutator<SerializedTask[]>) => void
}

export const useCreateFormDialog = create<CreateFormDialogState>()((set) => ({
  isOpen: false,
  mutate: undefined,
  setIsOpen: (open) => set({ isOpen: open }),
  setMutate: (mt) => set({ mutate: mt }),
}))
