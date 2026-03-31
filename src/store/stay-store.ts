import { ActiveStayInterface, FoundStayInterface } from "@/lib/index.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";




interface State{
  currentRoom: number
  stayData: Record<number,ActiveStayInterface>
  currentData: ActiveStayInterface | null

  foundData: FoundStayInterface[]
  
  setCurrentRoom: (room:number) => void
  setStayData: (data:Record<number,ActiveStayInterface>) => void
  setFoundData: (data:FoundStayInterface[]) => void
}

export const useStayStore = create<State>()(
  persist(
    (set,get) => ({
      currentRoom: 0,
      stayData: {},
      currentData: null,
      foundData: [],

      setCurrentRoom: (currentRoom) => set({ 
        currentRoom, 
        currentData: get().stayData[currentRoom] 
      }),

      setStayData: (stayData) => set({stayData}),

      setFoundData: (foundData) => set({foundData}),

    }),
    {
      name: 'stay-store'
    }
  )
)