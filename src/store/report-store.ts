import { create } from "zustand";

interface DailyReport{
  day: number
  observed: boolean
  total: number
  month:number
  year: number
}

interface State{
  dailyReport: DailyReport[]
  setDailyReport: (data:DailyReport[]) => void
}

export const useReportStore = create<State>()(
  (set) => ({
    dailyReport: [],

    setDailyReport: (data) => set({ dailyReport:data }),
  })
)