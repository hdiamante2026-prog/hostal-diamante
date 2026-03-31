import { genVisualDate, penFormat } from '@/lib/shared'
import { TableRow } from '../general'
import { FaStar, FaWalking } from 'react-icons/fa'
import { DetailStay } from './detail-stay'
import { FoundStayInterface } from '@/lib/index.interface'

interface Props{
  data: FoundStayInterface
}


export const StaysTableRow = ({data}:Props) => {
  const {clientInStay,roomId,stars,dateStart,dateEnd,totalCost,user,id} = data
  const [startDate,startTime] = genVisualDate(new Date(dateStart))
  const [endDate,endTime] = genVisualDate(new Date(dateEnd || 0))

  return (
    <TableRow>

      <div className='w-[40%] md:w-[25%]'>
        {
          clientInStay.map( ({client},ix) =>  
            <p key={'name_row_history_stay_'+client.numberDocument+ix} 
              className="-my-1.5 md:text-xl font-bold ml-2 capitalize"
            >
              {client.country.flag} {client.firstName} {client.lastName}
            </p>)
        }
      </div>

      <div className='w-[18%] md:w-[17.5%] '> 
        <p className='py-2 bg-back-1 text-sub-title mr-auto md:mx-auto rounded-lg w-12 md:w-14 text-center font-bold'>
          {roomId}
        </p> 
      </div>

      <div className='w-[30%] md:w-[17.5%] flex flex-col gap-0.5'>
        <div className='flex gap-1 items-center'>
            <FaWalking className='text-in-client px-1.5 py-1 rounded-md bg-in-client/20 size-6'/>
            <p className='md:text-lg'>{startDate}</p>
            <p className='text-neutral-500 text-sm mt-auto'>{startTime}</p>
        </div>
        <div className='flex gap-1 items-center'>
            <FaWalking className='text-out-client px-1.5 py-1 rounded-md bg-out-client/20 size-6 -scale-x-100'/>
            <p className='md:text-lg'>{endDate}</p>
            <p className='text-neutral-500 text-sm mt-auto'>{endTime}</p>
        </div>
      </div>

      <p className='md:w-[10%] hidden md:block text-money font-bold'>{penFormat(totalCost || 0)}</p>

      <p className='md:w-[10%] hidden md:block font-code'>{user.email.split('@')[0]}</p>

      <div className='md:w-[10%] hidden md:flex justify-center '>
        {Array.from({length:(stars||0)}, (_,ix) => <FaStar key={'star_'+ix} className='text-stars'/>)}
      </div>

      <DetailStay {...data}/>

    </TableRow>
  )
}
