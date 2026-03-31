'use client'

import { getNow, months, years } from "@/lib/shared";
import { FilterSelect, PageContent, PageHeader, SearchButton } from "../general"
import { StaysTable } from "./stays-table"
import { ChangeEvent, useState } from "react";
import { useMessageStore, useStayStore } from "@/store";
import { SAgetStaysByFilters } from "@/lib/server";


const initialData = {
  room:'',
  month: '',
  year: `${new Date().getFullYear()}`,
}

interface Props{
  rooms: number[]
}

const monthList = months()
const now = getNow()
const [nowMonth,nowYear] = [now.getMonth(), now.getFullYear()]
const filteredMonths = monthList.slice(0,nowMonth+1)

export const StaysContent = ({rooms}:Props) => {
  const meses = months()
  const anios = years()

  const [monthSelect, setMonthSelect] = useState(filteredMonths);
  const [searchData, setSearchData] = useState(initialData);
  const { stSetLoadingMsg, stSetStaticMsg } = useMessageStore()
  const {foundData,setFoundData} = useStayStore()

  const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof  searchData
    const value = e.target.value

    if(name == 'year' ) {
      if(+value < nowYear) setMonthSelect(monthList);
      else setMonthSelect(filteredMonths)
    }

    setSearchData(prev => ({...prev,[name]:value}))
  }

  const handleSearch = async () => {
    const {month,room,year} = searchData

    if(!month || !room || !year) return stSetStaticMsg('Debes seleccionar todos los campos');
    
    stSetLoadingMsg('buscando')
    const ixMonth = meses.indexOf(month)
    const data = await SAgetStaysByFilters(+year,ixMonth,+room)
    const success = data.length > 0
    const message = success ? 'Datos encontrados' : 'No hay datos para esos parametros'
    stSetStaticMsg(message,success)
    setFoundData(data)
  }
  
  
  return (
    <PageContent maxWRem={110}>
      <PageHeader>
        
        <FilterSelect
          id='select-stays-room' 
          label='Habitacion:' 
          options={rooms} 
          name="room"
          value={searchData.room}
          onChange={handleChange}
          />
        <FilterSelect
          id='select-stays-month' 
          label='Mes:' 
          options={monthSelect} 
          name="month"
          value={searchData.month}
          onChange={handleChange}
          />
        <FilterSelect
          id='select-stays-year' 
          label='Año:' 
          options={anios} 
          name="year"
          value={searchData.year}
          onChange={handleChange}
        />

        <SearchButton onCLick={handleSearch}/>

      </PageHeader>

      <StaysTable staysInfo={foundData}/>
      
    </PageContent>
  )
}
