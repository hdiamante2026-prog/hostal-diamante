'use client'

import React, { ChangeEvent, useState } from 'react'
import { FilterSelect, PageContent, PageHeader, SearchButton } from '../general'
import { getNow, months, years } from '@/lib/shared'
import { useLoadingStore, useMessageStore } from '@/store'
import { SAgetMinceturData } from '@/lib/server'
import { MinceturDataInterface } from '@/lib/index.interface'
import { Cap2Mincetur } from './cap2-mincetur'
import { Cap3Mincetur } from './cap3-mincetur'
import { Cap4Mincetur } from './cap4-mincetur'
import { Cap5Mincetur } from './cap5-mincetur'


const monthList = months()
const now = getNow()
const [nowMonth,nowYear] = [now.getMonth(), now.getFullYear()]
const filteredMonths = monthList.slice(0,nowMonth+1)

export const MinceturResume = () => {
  const [monthSelect, setMonthSelect] = useState(filteredMonths);
  const [filterData, setFilterData] = useState({ month:monthList[nowMonth],year:nowYear });
  const { stSetLoadingMsg,stSetStaticMsg } = useMessageStore()
  const {isSaving,setSavingST} = useLoadingStore()
  
  const [dataMincetur, setDataMincetur] = useState<Partial<MinceturDataInterface>>({});

  
  const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof filterData 
    const value = e.target.value

    if(name == 'year' ) {
      if(+value < nowYear) setMonthSelect(monthList);
      else setMonthSelect(filteredMonths)
    }
    
    setFilterData(prev => ({...prev,[name]:value}))
  }
  
  const handleClick = async () => {
    if(isSaving) return
    
    const {month,year} = filterData
    
    if(!month || !year) 
      return stSetStaticMsg('Ingrese los el mes y el año para realizar la busqueda');
    
    stSetLoadingMsg('buscando')
    setSavingST(true)
    const {success,...data} = await SAgetMinceturData(monthList.indexOf(month),+year)
    setSavingST(false)

    setDataMincetur(data)
    
    const message = success
      ? `Resultados encontrados para el periodo ${month}-${year}`
      : `No hay datos para el periodo ${month}-${year}`

    stSetStaticMsg(message,success)
  }

  const {ansCap2,ansCap3,ansCap4,ansCap5,totals} = dataMincetur
  
  return (
    <PageContent>
      <PageHeader>
        <div className="flex items-center gap-2">
          <FilterSelect
            id="select-month-report"
            label="Mes"
            options={monthSelect}
            name='month'
            value={filterData.month}
            onChange={handleChange}
          />
          <FilterSelect
            id="select-year-report"
            label="Año"
            options={years()}
            name='year'
            value={filterData.year}
            onChange={handleChange}
          />
          <SearchButton onCLick={handleClick} />
        </div>
      </PageHeader>


      <div className='w-full h-full grid grid-cols-12 gap-x-5 gap-y-2'>

       { totals &&
          <>
            { ansCap2 && <Cap2Mincetur data={ansCap2} totals={totals}/> }

            { ansCap3 && <Cap3Mincetur data={ansCap3} totals={totals.persons.total}/> }

            { ansCap4 && <Cap4Mincetur data={ansCap4} totals={totals}/> }

            { ansCap5 && <Cap5Mincetur data={ansCap5} totals={totals}/> }
          </>
       }

      </div>
    </PageContent>
    
  )
}
