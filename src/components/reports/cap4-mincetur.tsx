

import { TableApp, TableHeader, TableRow } from '../general'
import { AnsCap4Type, AnsTotals } from '@/lib/index.interface'

interface Data {
  data:AnsCap4Type
  totals: AnsTotals
}


export const Cap4Mincetur = ({data,totals}:Data) => {

  const countriesKeys = Object.keys(data.exterior)
  const countriesData = Object.values(data.exterior)
  const citiesKeys = Object.keys(data.interior)
  const citiesData = Object.values(data.interior)

  return (
    <div className='col-span-12'>
      
      <p className='text-xl font-bold text-gray-04 uppercase'> 
        Capitulo IV: <span className='text-lg text-gray-03 capitalize'>Arribos y pernoctaciones segun origen</span>  
      </p>

      <div className='grid grid-cols-2 gap-5 '>

        <TableApp>

          <TableHeader>
            <p className='w-1/2 text-base'>Pais o Continenete</p>
            <p className='w-1/4 text-base text-center'>Arribos</p>
            <p className='w-1/4 text-base text-center'>Pernoctaciones</p>
          </TableHeader>

          {
            countriesKeys.map( (el,ix) => 
              <TableRow key={'mincetur-ans2-'+el}>
                <p className='-my-1.5 w-1/2 text-gray-05 text-lg'>{el}</p>
                <p className='-my-1.5 w-1/4 text-gray-05 text-lg text-center'>{countriesData[ix][0]}</p>
                <p className='-my-1.5 w-1/4 text-gray-05 text-lg text-center'>{countriesData[ix][1]}</p>
              </TableRow>
            )
          }

          <div className='flex-1'/>

          <TableRow className='font-bold border-t'>
            <p className='w-1/2 text-gray-05 text-lg'>TOTAL de Extranjeros</p>
            <p className='w-1/4 text-gray-05 text-lg text-center'>{totals.persons.exterior}</p>
            <p className='w-1/4 text-gray-05 text-lg text-center'>{totals.nights.exterior}</p>
          </TableRow>

        </TableApp>

        <TableApp>

          <TableHeader>
            <p className='w-1/2 text-base'>Region</p>
            <p className='w-1/4 text-base text-center'>Arribos</p>
            <p className='w-1/4 text-base text-center'>Pernoctaciones</p>
          </TableHeader>

          {
            citiesKeys.map( (el,ix) => 
              <TableRow key={'mincetur-ans2-'+el}>
                <p className='-my-1.5 w-1/2 text-gray-05 text-lg'>{el}</p>
                <p className='-my-1.5 w-1/4 text-gray-05 text-lg text-center'>{citiesData[ix][0]}</p>
                <p className='-my-1.5 w-1/4 text-gray-05 text-lg text-center'>{citiesData[ix][1]}</p>
              </TableRow>
            )
          }
          <div className='flex-1'/>

          <TableRow className='font-bold border-t'>
            <p className='w-1/2 text-gray-05 text-lg'>TOTAL de Extranjeros</p>
            <p className='w-1/4 text-gray-05 text-lg text-center'>{totals.persons.interior}</p>
            <p className='w-1/4 text-gray-05 text-lg text-center'>{totals.nights.interior}</p>
          </TableRow>

        </TableApp>
      </div>
    </div>

  )
}
