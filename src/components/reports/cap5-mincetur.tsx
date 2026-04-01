

import { TableApp, TableHeader, TableRow } from '../general'
import { AnsCap5Type, AnsTotals } from '@/lib/index.interface'

interface Data {
  data:AnsCap5Type
  totals: AnsTotals
}


export const Cap5Mincetur = ({data,totals}:Data) => {
  const {exterior,interior} = data
  const sums = exterior.map( (el,ix) => el + interior[ix] )

  return (
    <div className='col-span-12'>
      
      <p className='text-xl font-bold text-gray-04 uppercase '> 
        Capitulo V: <span className='text-lg text-gray-03 capitalize'>Capacidad de alojamiento</span>  
      </p>

      <TableApp>

        <TableHeader>
          <p className='w-3/12 text-base'>DETALLE</p>
          <p className='w-1/12 text-base text-center'>Total</p>
          <p className='w-1/12 text-base text-center'>Vacaciones</p>
          <p className='w-1/12 text-base text-center'>Visitas</p>
          <p className='w-1/12 text-base text-center'>Educacion</p>
          <p className='w-1/12 text-base text-center'>Salud</p>
          <p className='w-1/12 text-base text-center'>Religion</p>
          <p className='w-1/12 text-base text-center'>Compras</p>
          <p className='w-1/12 text-base text-center'>Negocios</p>
          <p className='w-1/12 text-base text-center'>Otros</p>
        </TableHeader>


        <TableRow>
          <p className='-my-1.5 w-3/12 text-gray-05 text-lg'>Extranjeros y no residentes</p>
          <p className='-my-1.5 w-1/12 text-gray-05 text-lg text-center'>{totals.persons.exterior}</p>

          { exterior.map( (el,ix) => 
            <p 
              className='-my-1.5 w-1/12 text-gray-05 text-lg text-center'
              key={'exterior-value-cap5'+ix}
            >{el || ''}</p> ) }
        </TableRow>

        <TableRow>
          <p className='-my-1.5 w-3/12 text-gray-05 text-lg'>Peruanos y residentes</p>
          <p className='-my-1.5 w-1/12 text-gray-05 text-lg text-center'>{totals.persons.interior}</p>

          { interior.map( (el,ix) => 
            <p 
              className='-my-1.5 w-1/12 text-gray-05 text-lg text-center'
              key={'interior-value-cap5'+ix}
            >{el || ''}</p> ) }
        </TableRow>

        <TableRow className='font-bold border-t'>
          <p className='w-3/12 text-gray-05 text-lg'>TOTAL</p>
          <p className='w-1/12 text-gray-05 text-lg text-center'>{totals.persons.total}</p>

          { sums.map( (el,ix) => 
            <p 
              className='w-1/12 text-gray-05 text-lg text-center'
              key={'interior-value-cap5'+ix}
            >{el || ''}</p> ) }
        </TableRow>


      </TableApp>
    </div>

  )
}
