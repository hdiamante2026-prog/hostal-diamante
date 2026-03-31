import { TableRow } from '../general'
import { FaMoneyBill } from 'react-icons/fa'
import { MdDryCleaning } from 'react-icons/md'
import { ConfigActive } from './config-active'
import { RemoveActive } from './remove-active'
import { formatDate } from '@/lib/shared'
import { RoomActive } from '@/generated/prisma/client'

interface Props extends RoomActive{
  rooms: string[]
}

export const ActivesTableRow = ({room,description,dateCreated,dateMoved,id,rooms}:Props) => {
  const dateBuy = formatDate(dateCreated)[0]
  const dateMove = formatDate(dateMoved)[0]

  return (
    <TableRow>
      <p className='w-[52.5%] text-base md:text-2xl text-wrap '>{description}</p>

      <div className='w-[20%] flex flex-col gap-1 md:gap-2 text-lg md:text-xl'>
        <div className='flex items-center gap-1 md:gap-3'>
          <MdDryCleaning className='size-7 md:size-9 px-1 py-0.5 bg-primary/20 text-primary rounded-lg'/>
          <p>
            <span className='hidden md:inline'>{dateMove.slice(0,3)}</span>
            {dateMove.slice(3)}
          </p>
        </div>
        <div className='flex items-center gap-1 md:gap-3'>
          <FaMoneyBill className='size-7 md:size-9 px-1 py-0.5 bg-blue-01/20 text-blue-01 rounded-lg'/>
          <p>
            <span className='hidden md:inline'>{dateBuy.slice(0,3)}</span>
            {dateBuy.slice(3)}
          </p>
        </div>
      </div>

      <div className='w-[12.5%] '>
        <p className='py-2 bg-back-1 text-sub-title mr-auto rounded-lg text-xl md:text-2xl w-14 md:w-18 text-center font-bold'>
          {room}
        </p> 
      </div>

      <ConfigActive description={description} id={id} room={room} rooms={['afuera',...rooms]} />

      <RemoveActive description={description} id={id}/>
      
    </TableRow>
  )
}
