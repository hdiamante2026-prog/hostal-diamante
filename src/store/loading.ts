import { create } from "zustand";

interface State{
  isLoading: boolean
  togleLoading: () => void

  isSaving: boolean
  setSavingST: (input:boolean) => void
}

export const useLoadingStore = create<State>()(
  (set,get) => ({
    isLoading: false,
    isSaving: false,

    togleLoading: () => {
      const actualValue = get().isLoading

      set({isLoading: !actualValue})
    },
    setSavingST: (isSaving) => set({isSaving}),
  }),
)