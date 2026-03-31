import { create } from "zustand";


interface State{
  stMessage: string
  stLoadingMsg: boolean
  stGoodMsg: boolean

  stResetMsg: () => void
  stSetLoadingMsg: (message:string) => void
  stSetStaticMsg: (message:string,good?:boolean) => void
}

export const useMessageStore = create<State>()(
  (set) => ({
    stMessage: '',
    stLoadingMsg: false,
    stGoodMsg: false,

    stResetMsg: () => set({ stMessage:'', stGoodMsg:false, stLoadingMsg:false }),
    stSetLoadingMsg: (msg) => set({ stMessage:msg, stLoadingMsg:true }),
    stSetStaticMsg: (msg,bool=false) => set({ stMessage:msg, stLoadingMsg:false, stGoodMsg:bool }),
  })
)