import clsx from 'clsx'
import { TableRow } from '../general'
import { penFormat } from '@/lib/shared'

type Method = 'efectivo' | 'electronico'

interface DailyTableRowProps{
  hour: string
  mount: number
  email: string
  payType: Method
  operationNumber: string | null
  description: string
}

export const DailyTableRow = ({hour,mount,email,payType,operationNumber,description}:DailyTableRowProps) => {
  
  return (
    <TableRow>
      <p className='w-[15%] md:w-[10%] text-lg md:text-2xl font-bold'>{hour}</p>
      
      <div className='w-[40%] md:w-[45%]'>
        <p className='text-xl font-bold'>{description}</p>
      </div>
      
      <p className='md:w-[20%] hidden md:block text-done-button-text font-bold font-code text-xl'>{email}</p>
      
      <div className='w-[30%] md:w-[15%] text-center flex flex-col items-center'>
        <p className={clsx(
              'px-3 py-1 rounded-lg font-bold text-base md:text-xl ',
              payType === 'efectivo' ? 'text-money bg-money/10' : 'text-white bg-stars'
            )}
        >
          {payType}
        </p>
        <p className='text-xs md:text-base text-done-button-text'>{operationNumber}</p>
      </div>

      <p className='w-[15%] md:w-[10%] text-sub-title font-extrabold text-lg md:text-2xl text-right h-12'>
        {penFormat(mount)}
      </p>
    </TableRow>
  )
}
