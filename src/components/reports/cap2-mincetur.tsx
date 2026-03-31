

import { TableApp, TableHeader, TableRow } from '../general'
import { AnsCap2Type, AnsTotals } from '@/lib/index.interface'

interface Data {
  data:AnsCap2Type
  totals: AnsTotals
}


export const Cap2Mincetur = ({data,totals}:Data) => {

  return (
    <div className='col-span-5'>
      
      <p className='text-xl font-bold text-gray-04 uppercase'> 
        Capitulo II: <span className='text-lg text-gray-03 capitalize'>Capacidad de alojamiento</span>  
      </p>

      <TableApp>

        <TableHeader>
          <p className='w-1/4 text-base'>Tipo</p>
          <p className='w-1/4 text-base text-center'>Personas</p>
          <p className='w-1/4 text-base text-center'>Habitaciones</p>
          <p className='w-1/4 text-base text-center'>Pernoctaciones</p>
        </TableHeader>

        {
          data.map( ({name,nights,persons,rooms}) => 
            <TableRow key={'mincetur-ans2-'+name}>
              <p className='-my-1.5 w-1/4 text-gray-05 text-lg'>{name}</p>
              <p className='-my-1.5 w-1/4 text-gray-05 text-lg text-center'>{persons || ''}</p>
              <p className='-my-1.5 w-1/4 text-gray-05 text-lg text-center'>{rooms || ''}</p>
              <p className='-my-1.5 w-1/4 text-gray-05 text-lg text-center'>{nights || ''}</p>
            </TableRow>
          )
        }

        <TableRow className='font-bold border-t'>
          <p className='w-1/4 text-gray-05 text-lg'>TOTAL</p>
          <p className='w-1/4 text-gray-05 text-lg text-center'>{totals.persons.total}</p>
          <p className='w-1/4 text-gray-05 text-lg text-center'>{totals.rooms}</p>
          <p className='w-1/4 text-gray-05 text-lg text-center'>{totals.nights.total}</p>
        </TableRow>

      </TableApp>
    </div>

  )
}
