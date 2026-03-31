import { ClientCompany } from "@/generated/prisma/browser";
import { CompanyObjectdata } from "@/lib/index.interface";
import { create } from "zustand";

const baseCurrnetCompany = {name:'',chassisList:[],dayPrice:0,id:0,fileUrl:''}

interface State{
  currentId: number
  allData: CompanyObjectdata
  currentCompany: ClientCompany

  setAllData: (inData:CompanyObjectdata) => void
  setCurrentCompany: (inId:number) => void
  addChassisToCurrentCompany: (inChassis:string) => void
}

export const useCompanyStore = create<State>()(
  (set,get) => ({
    currentId: 0,
    allData: {},
    currentCompany: baseCurrnetCompany,

    setAllData: (inData) => set({allData:inData}),
    setCurrentCompany: (inId) => set({
      currentCompany: get().allData[inId],
      currentId: inId
    }),
    addChassisToCurrentCompany: (inChassis) => {
      const current = get().currentCompany
      current.chassisList.push(inChassis)

      set({currentCompany:current})
    }
  })
)