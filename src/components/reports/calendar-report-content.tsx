'use client'

import { SAgetMonthReport } from '@/lib/server'
import { FilterSelect, PageContent, PageHeader, SearchButton } from '../general'
import { format0, getNow, months, penFormat, years } from '@/lib/shared'
import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa'
import { useMessageStore, useReportStore } from '@/store'

export const dynamic = 'force-dynamic'


const monthList = months()
const now = getNow()
const [nowMonth,nowYear] = [now.getMonth(), now.getFullYear()]
const filteredMonths = monthList.slice(0,nowMonth+1)

export const CalendarReportContent = () => {

  const [monthSelect, setMonthSelect] = useState(filteredMonths);
  const [filterData, setFilterData] = useState({ month:monthList[nowMonth],year:nowYear });
  const [total, setTotal] = useState<number|null>(null);
  const { dailyReport, setDailyReport } = useReportStore()
  const { stSetLoadingMsg,stSetStaticMsg } = useMessageStore()


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
    const {month,year} = filterData
    
    if(!month || !year) 
      return stSetStaticMsg('Ingrese los el mes y el año para realizar la busqueda');
      
    stSetLoadingMsg('buscando')
    const response = await SAgetMonthReport(monthList.indexOf(month),+year)

    const success = response.data.length > 0
    const message = success
      ? `Resultados encontrados para el periodo ${month}-${year}`
      : `No hay datos para el periodo ${month}-${year}`

    stSetStaticMsg(message,success)
    setDailyReport(response.data)
    setTotal(response.total)
  }

  const monthCard = format0( monthSelect.indexOf( filterData.month ) +1 )
  const yearCard = String(filterData.year).slice(2)
  
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

        
        <div className='flex items-center gap-2 font-bold'>
          <p className='text-gray-03 text-xl'>TOTAL:</p>
          <p className='text-money/80 text-3xl'>S/ {total || 0} </p>
        </div>
        
      </PageHeader>

      <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
        

        {dailyReport.map( (el,ix) => 
          <Link key={'item_card'+ix} href={`/dashboard/reports/daily/${el.year}-${format0(el.month+1)}-${format0(el.day)}`}>
            <div className="rounded-xl border-border-sidebar shadow-lg px-3 py-2">
              <div className="flex flex-row items-center justify-between mb-3">
                <p className="text-done-button-text text-3xl md:text-5xl  2xl:text-7xl ">
                  {format0(el.day)} 
                  <span className='text-base uppercase'>{monthCard}/{yearCard}</span>
                </p>
                {el.observed && <FaEye className="text-orange-1 size-8"/>}
              </div>
              <p className="text-gray-10 text-xs md:text-sm 2xl:text-base">
                INGRESOS <span className="hidden md:inline">TOTALES</span>:
              </p>
              <p className="text-primary text-xl font-bold">{penFormat(el.total)}</p>
            </div>
          </Link>)
        }
        
      </div>

    </PageContent>
  )
}
