

import { format0 } from '@/lib/shared'
import { AnsCap3Type } from '@/lib/index.interface'

interface Data {
  data:AnsCap3Type
  totals: number
}


export const Cap3Mincetur = ({data,totals}:Data) => {

  return (
    <div className='col-span-7'>

      <p className='text-xl font-bold text-gray-04 uppercase'> 
        Capitulo III: <span className='text-lg text-gray-03 capitalize'>
          Numero de arribos por dia
        </span>  
      </p>

      <div className='w-full flex flex-wrap gap-3.5 p-4 border border-white-03 shadow rounded-2xl'>

        {data.map( (el,ix) => 
          <div 
            key={'cap3-mincetur'+el+ix}
            className='flex items-center'
          >
            <p className='w-20 text-black-01'>Dia {format0(+ix+1)}</p>
            <p className='w-15 border border-white-04 rounded h-7 text-center'>{el || ''}</p>
          </div>
        )}

        <div className='flex items-center font-bold'>
          <p className='w-20 text-black-02'>TOTAL</p>
          <p className='w-15 border border-white-04 rounded h-7 text-center'>{totals}</p>
        </div>
        
      </div>
    </div>
  )
}
